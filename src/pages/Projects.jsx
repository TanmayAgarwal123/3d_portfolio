import React, { useState } from 'react';
import { projects } from '../constants';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import PageTransition from '../components/PageTransition';
import CVModal from '../components/CVModal';
import ScrollToTop from '../components/ScrollToTop';
import { download } from "../assets/icons";

const Projects = () => {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <PageTransition variant="scale">
      <section className="max-container">
        <h1 className="head-text dark:text-white">
          My <span className="blue-gradient_text font-semibold drop-shadow">Projects</span>
        </h1>
        <div className="flex mt-5 flex-col gap-3 text-slate-500 dark:text-slate-400">
          <p>
            I've embarked on numerous projects throughout the years, but these are the ones I hold closest to my heart.
            Many of them are open-source, so if you come across something that piques your interest, feel free to
            explore the codebase and contribute your ideas for further enhancements.
          </p>
        </div>
        <div className="flex flex-wrap my-20 gap-16">
          {projects.map((project, i) => (
            <motion.div
              className="lg:w-[400px] w-full"
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="block-container w-12 h-12">
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img src={project.iconUrl} alt="Project Icon" className="w-1/2 h-1/2 object-contain" />
                </div>
              </div>

              <div className="mt-5 flex flex-col">
                <h4 className="text-2xl font-poppins font-semibold dark:text-white">{project.name}</h4>
                <p className="mt-2 text-slate-500 dark:text-slate-400">{project.description}</p>

                {/* Tech stack tags */}
                {project.techStack && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center gap-2 font-poppins">
                  <Link to={project.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600">
                    Live Link
                  </Link>
                  <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <br />
        <div className="relative">
          <button
            onClick={() => setCvOpen(true)}
            className="neo-brutalism-white neo-btn text-sm !relative !bottom-auto !mx-0 !right-auto !left-auto"
          >
            Preview CV
            <img src={download} alt="download" className="w-4 h-4 object-contain" />
          </button>
        </div>
        <hr className="border-slate-200 dark:border-slate-700" />
        <CTA />
      </section>
      <ScrollToTop />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </PageTransition>
  );
};

export default Projects;
