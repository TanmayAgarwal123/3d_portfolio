import { meta, shopify, starbucks, tesla, prostartme, codeclause, hospital } from "../assets/images";
import {
  web,
  instagram,
  seo,
  thinking,
  numpy,
  django,
  chatgpt,
  visualstudiocode,
  data,
  java,
  c,
  python,
  car,
  contact,
  css,
  estate,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  motion,
  mui,
  nextjs,
  nodejs,
  pricewise,
  react,
  redux,
  sass,
  snapgram,
  summiz,
  tailwindcss,
  threads,
  typescript,
  columbia,
  suryaa,
} from "../assets/icons";

export const skillCategories = ["All", "Languages", "Frontend", "Backend", "Tools", "Soft Skills"];

export const skills = [
  { imageUrl: python, name: "Python", category: "Languages" },
  { imageUrl: c, name: "C++", category: "Languages" },
  { imageUrl: java, name: "Java", category: "Languages" },
  { imageUrl: javascript, name: "JavaScript", category: "Languages" },
  { imageUrl: html, name: "HTML", category: "Frontend" },
  { imageUrl: css, name: "CSS", category: "Frontend" },
  { imageUrl: react, name: "React", category: "Frontend" },
  { imageUrl: tailwindcss, name: "Tailwind CSS", category: "Frontend" },
  { imageUrl: express, name: "Express", category: "Backend" },
  { imageUrl: django, name: "Django", category: "Backend" },
  { imageUrl: numpy, name: "Numpy", category: "Backend" },
  { imageUrl: github, name: "GitHub", category: "Tools" },
  { imageUrl: git, name: "Git", category: "Tools" },
  { imageUrl: visualstudiocode, name: "VS Code", category: "Tools" },
  { imageUrl: chatgpt, name: "ChatGPT+", category: "Tools" },
  { imageUrl: data, name: "DSA", category: "Tools" },
  { imageUrl: thinking, name: "Creative Thinking", category: "Soft Skills" },
  { imageUrl: seo, name: "SEO", category: "Soft Skills" },
];

export const experiences = [
  // {
  //     title: "React.js Developer",
  //     company_name: "Starbucks",
  //     icon: starbucks,
  //     iconBg: "#accbe1",
  //     date: "March 2020 - April 2021",
  //     points: [
  //         "Developing and maintaining web applications using React.js and other related technologies.",
  //         "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //         "Implementing responsive design and ensuring cross-browser compatibility.",
  //         "Participating in code reviews and providing constructive feedback to other developers.",
  //     ],
  // },

  {
    title: "LLM Research Assistant",
    company_name: "Columbia University",
    icon: columbia,
    iconBg: "#f5f7f9",
    date: "Sept 2025 - current",
    points: [
      "Joined a team whose work has produced over 8,000 citations across top journals, including three ’gold standard’ papers in processfault diagnosis and safety, and led projects advancing the most-cited AI paper in chemical engineering in the last 20 years.",
      "Supported cross-disciplinary research in adaptive systems and AI, working in a lab awarded multiple NSF/doctoral fellowships,recognized by premier engineering societies, and led by faculty newly elected to the National Academy of Engineering in 2025",
    ],
  },
  {
    title: "Data Analyst",
    company_name: "Suryaa Chamball Power Limited",
    icon: suryaa,
    iconBg: "#1f8cc0",
    date: "Jan 2025 - Aug 2025",
    points: [
      "Engineered a data analysis framework, reducing manual processing time by 40% and improving data accuracy by 25%",
      "Trained ML algorithms using Python and SQL to build predictive models for power loss estimation, increasing accuracy by 15%",
      "Architected real-time Power BI dashboards, enabling stakeholders to identify anomalies and make data-driven decisions.",
    ],
  },
  {
    title: "Freelancing Web Developer",
    company_name: "Lakshya NGO",
    icon: hospital,
    iconBg: "#feff57",
    date: "June 2024 - July 2024",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Made a free of cost website for a education based NGO as social service.",
    ],
  },
  {
    title: "SEO and Generative AI Intern",
    company_name: "Pro Start Me ltd.",
    icon: prostartme,
    iconBg: "#CBC3E3",
    date: "Aug 2023 - Sept 2023",
    points: [
      "Contributed to an automated reporting tool, cutting reporting time by 54%.",
      "Competitor analysis resulted in 45% ranking improvement.",
      "Improved meta titles and descriptions, increasing organic search CTR by 30%.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
    ],
  },
  {
    title: "Python Developer",
    company_name: "CodeClause",
    icon: codeclause,
    iconBg: "#9bedff",
    date: "July 2023 - July 2023",
    points: [
      "Implemented 4 projects, covering all the tasks during the internship.",
      "Showcased skill by decreasing code size by 30%, leading to more streamlined code.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Freelancing Web Developer",
    company_name: "Agrawal Child Hospital",
    icon: hospital,
    iconBg: "#d1ffbd",
    date: "Jan 2023 - July 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Enhanced hospital website traffic by 50% through implementing SEO strategies and optimizing site performance.",
    ],
  },
];

export const socialLinks = [
  {
    name: "Contact",
    iconUrl: contact,
    link: "/contact",
  },
  {
    name: "Instagram",
    iconUrl: instagram,
    link: "https://www.instagram.com/tanmay.agarwal10/",
  },
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/TanmayAgarwal123",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://www.linkedin.com/in/tanmay10agarwal",
  },
];

export const projects = [
  {
    iconUrl: data,
    theme: "btn-back-orange",
    name: "CodeScope AI",
    description:
      "Developed an AI-driven platform that interprets and instantly graphifies multi-language codebases with >90% accuracy. Reduced code-comprehension time by 60% and boosted developer onboarding efficiency by 40%.",
    techStack: ["AWS Bedrock", "Python", "React", "LLM"],
    link: "https://github.com/TanmayAgarwal123",
  },
  {
    iconUrl: web,
    theme: "btn-back-yellow",
    name: "3D Portfolio",
    description:
      "A captivating 3D portfolio with interactive island exploration, built with Three.js and React Three Fiber.",
    techStack: ["React", "Three.js", "Tailwind", "Framer Motion"],
    link: "https://tanmayresume.com",
  },
  {
    iconUrl: estate,
    theme: "btn-back-black",
    name: "FigPro",
    description: "Developed a web application, working clone of Figma with real-time collaboration features.",
    techStack: ["Next.js", "TypeScript", "Liveblocks", "Fabric.js"],
    link: "https://figpro101.vercel.app/",
  },
  {
    iconUrl: threads,
    theme: "btn-back-green",
    name: "Full Stack Threads Clone",
    description:
      'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
    techStack: ["Next.js", "MongoDB", "Clerk", "Tailwind"],
    link: "https://threads101.netlify.app/",
  },
  {
    iconUrl: snapgram,
    theme: "btn-back-pink",
    name: "SNAPGRAM",
    description:
      "Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.",
    techStack: ["React", "Appwrite", "React Query", "TypeScript"],
    link: "https://snapgram101.vercel.app/",
  },
  {
    iconUrl: pricewise,
    theme: "btn-back-red",
    name: "EnRoute - Shuttle Tracking",
    description:
      "Used real-time GPS data in a bus tracking project to streamline routes and cut fuel, leading to cost savings.",
    techStack: ["React", "GPS API", "Node.js", "Maps"],
    link: "https://github.com/TanmayAgarwal123/EnRoute",
  },
];

export const stats = [
  { label: "Projects", value: 100, suffix: "+" },
  { label: "Languages Supported", value: 13, suffix: "+" },
  { label: "Work Experiences", value: 6, suffix: "+" },
  { label: "Code Accuracy", value: 95, suffix: "%" },
];
