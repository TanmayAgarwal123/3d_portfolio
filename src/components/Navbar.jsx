import { NavLink } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) => isActive ? 'text-blue-500' : 'text-black dark:text-white';

  return (
    <header className="header">
      <NavLink to="/" className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 items-center justify-center flex font-bold shadow-md">
        <p className="blue-gradient_text">TA</p>
      </NavLink>

      {/* Desktop nav */}
      <nav className="hidden sm:flex text-lg gap-7 font-medium items-center">
        <NavLink to="/about" className={linkClass}>About</NavLink>
        <NavLink to="/projects" className={linkClass}>Projects</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact Me</NavLink>
        <ThemeToggle />
      </nav>

      {/* Mobile hamburger */}
      <div className="sm:hidden flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-md z-50"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-slate-700 dark:bg-white" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-0.5 bg-slate-700 dark:bg-white" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-slate-700 dark:bg-white" />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-screen bg-white dark:bg-slate-900 shadow-2xl z-40 flex flex-col gap-6 pt-20 px-8"
          >
            <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>
              <span className="text-lg font-medium">About</span>
            </NavLink>
            <NavLink to="/projects" className={linkClass} onClick={() => setMenuOpen(false)}>
              <span className="text-lg font-medium">Projects</span>
            </NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>
              <span className="text-lg font-medium">Contact Me</span>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-30 sm:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
