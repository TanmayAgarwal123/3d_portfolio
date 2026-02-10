import { motion } from 'framer-motion';

// Different transition variants for different pages
const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -60 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 60 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 60 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -60 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -5, scale: 0.95 },
    in: { opacity: 1, rotate: 0, scale: 1 },
    out: { opacity: 0, rotate: 5, scale: 0.95 },
  },
};

const transitionConfigs = {
  fade: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
  slideUp: { type: 'spring', stiffness: 100, damping: 20 },
  slideRight: { type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 },
  slideLeft: { type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 },
  scale: { type: 'spring', stiffness: 200, damping: 25 },
  rotate: { type: 'spring', stiffness: 150, damping: 20 },
};

const PageTransition = ({ children, variant = 'slideUp' }) => {
  const variants = transitionVariants[variant] || transitionVariants.slideUp;
  const transition = transitionConfigs[variant] || transitionConfigs.slideUp;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
