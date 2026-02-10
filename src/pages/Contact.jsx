import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

import Fox from '../models/Fox';
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
import PageTransition from '../components/PageTransition';

const SuccessOverlay = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, times: [0, 0.6, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
            <motion.svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.svg>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-green-600 dark:text-green-400 font-semibold text-lg"
          >
            Message Sent!
          </motion.p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  const { alert, showAlert, hideAlert } = useAlert();

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    else if (form.name.length > 100) newErrors.name = 'Name must be less than 100 characters';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email address';
    else if (form.email.length > 255) newErrors.email = 'Email must be less than 255 characters';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.length > 5000) newErrors.message = 'Message must be less than 5000 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setCurrentAnimation('hit');

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() },
      });
      if (error) throw error;

      setShowSuccess(true);
      showAlert({ type: 'success', text: 'Message sent successfully!' });

      setTimeout(() => {
        setCurrentAnimation('idle');
        setShowSuccess(false);
        setForm({ name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setCurrentAnimation('idle');
      const errorMessage = error?.message?.includes('429')
        ? 'Too many submissions. Please try again later.'
        : 'Failed to send message. Please try again.';
      showAlert({ type: 'danger', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  return (
    <PageTransition variant="slideLeft">
      <section className="relative flex lg:flex-row flex-col max-container">
        {alert.show && <Alert {...alert} />}

        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="head-text dark:text-white">Get in Touch</h1>

          <form className="w-flex flex flex-col gap-7 mt-14" onSubmit={handleSubmit}>
            <label className="text-black-500 dark:text-slate-300 font-semibold">
              Name
              <input
                type="text"
                name="name"
                className={`input dark:bg-slate-800 dark:text-white dark:border-slate-600 ${errors.name ? 'border-red-500' : ''}`}
                placeholder="your name"
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </label>
            <label className="text-black-500 dark:text-slate-300 font-semibold">
              Email
              <input
                type="email"
                name="email"
                className={`input dark:bg-slate-800 dark:text-white dark:border-slate-600 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your email id"
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </label>
            <label className="text-black-500 dark:text-slate-300 font-semibold">
              Your Message
              <textarea
                name="message"
                rows={4}
                className={`textarea dark:bg-slate-800 dark:text-white dark:border-slate-600 ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Let me know how can I help you!"
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message}</span>}
              <span className="text-slate-400 text-sm mt-1 block text-right">{form.message.length}/5000</span>
            </label>
            <button type="submit" className="btn" disabled={isLoading} onFocus={handleFocus} onBlur={handleBlur}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        <div className="lg:w-1/2 w-full lg:h-auto md-h-[550px] h-[350px] relative">
          <SuccessOverlay show={showSuccess} />
          <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.6, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
