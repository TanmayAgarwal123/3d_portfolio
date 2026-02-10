import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Counter = ({ value, suffix = '', label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-4xl sm:text-5xl font-bold blue-gradient_text">
        {count}{suffix}
      </span>
      <span className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">
        {label}
      </span>
    </motion.div>
  );
};

const AnimatedCounter = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
      {stats.map((stat, i) => (
        <Counter key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
      ))}
    </div>
  );
};

export default AnimatedCounter;
