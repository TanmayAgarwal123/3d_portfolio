import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects } from "./pages";

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route
          path='/*'
          element={
            <>
              <Routes>
                <Route path='/about' element={<About />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/contact' element={<Contact />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <main className='bg-slate-300/20 dark:bg-slate-900 min-h-screen transition-colors duration-300'>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </main>
  );
};

export default App;
