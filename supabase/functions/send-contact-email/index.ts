import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_URL = "https://api.resend.com/emails";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

// Simple in-memory rate limiting (resets when function cold starts)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // Max submissions per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials are not configured");
    }

    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    // Check rate limit
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // NOTE: If your Resend account/domain is not verified yet, Resend only allows
    // sending to your own verified email. Update this once your domain is verified.
    const CONTACT_TO_EMAIL = "ta2830@columbia.edu";

    const { name, email, message }: ContactRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Field length exceeded. Name: max 100, Email: max 255, Message: max 5000 characters." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitize = (str: string) => str.replace(/[<>]/g, '');
    const sanitizedName = sanitize(name.trim());
    const sanitizedMessage = sanitize(message.trim());

    // Store submission in database as backup
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const userAgent = req.headers.get("user-agent") || "unknown";
    
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: sanitizedName,
        email: email.trim(),
        message: sanitizedMessage,
        ip_address: clientIP,
        user_agent: userAgent,
      });
    
    if (dbError) {
      console.error("Failed to store contact submission:", dbError);
      // Continue anyway - email is primary, DB is backup
    }

    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: [CONTACT_TO_EMAIL],
        subject: `New Contact Form Message from ${sanitizedName}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <h2>Message:</h2>
          <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        `,
        reply_to: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return new Response(
        JSON.stringify({
          success: false,
          error:
            data?.message
              ? `Resend API error: ${data.message}`
              : `Resend API error: ${JSON.stringify(data)}`,
          data,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Contact email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
