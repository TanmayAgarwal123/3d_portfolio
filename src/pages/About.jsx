import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React, { useState } from 'react';
import { skills, experiences, stats } from '../constants';
import CTA from '../components/CTA';
import PageTransition from '../components/PageTransition';
import SkillsFilter from '../components/SkillsFilter';
import AnimatedCounter from '../components/AnimatedCounter';
import GitHubActivity from '../components/GitHubActivity';
import CVModal from '../components/CVModal';
import ScrollToTop from '../components/ScrollToTop';
import { download } from "../assets/icons";

const About = () => {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <PageTransition variant="slideRight">
      <section className="max-container">
        <h1 className="head-text dark:text-white">
          Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Tanmay</span>
        </h1>
        <div className="flex mt-5 flex-col gap-3 text-slate-500 dark:text-slate-400">
          <p>
            As a dedicated Software Engineer in USA, I'm driven by a strong desire for knowledge and aim to make a
            significant impact on society. I enthusiastically welcome challenges as chances to innovate and bring about
            positive change, constantly seeking opportunities for learning and growth.
          </p>
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
        </div>

        {/* Stats */}
        <AnimatedCounter stats={stats} />

        {/* Skills with filter */}
        <div className="py-10 flex flex-col">
          <h3 className="subhead-text dark:text-white">My Skills</h3>
          <div className="mt-16">
            <SkillsFilter skills={skills} />
          </div>
        </div>

        {/* Work Experience */}
        <div className="py-16">
          <h3 className="subhead-text dark:text-white">Work Experience</h3>
          <div className="flex mt-5 flex-col gap-3 text-slate-500 dark:text-slate-400">
            <p>
              I've worked with all sorts of people and companies,
              leveling up my skills and teaming up with smart people.
              <br /> Here's the rundown:
            </p>
          </div>

          <div className="mt-12 flex">
            <VerticalTimeline>
              {experiences.map((experience) => (
                <VerticalTimelineElement
                  key={experience.company_name}
                  date={experience.date}
                  icon={
                    <div className="flex justify-center items-center h-full w-full">
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  iconStyle={{ background: experience.iconBg }}
                  contentStyle={{
                    borderBottom: '8px',
                    borderStyle: 'solid',
                    borderBottomColor: experience.iconBg,
                    boxShadow: 'none',
                  }}
                >
                  <div>
                    <h3 className="text-black dark:text-slate-900 text-xl font-poppins font-semibold">
                      {experience.title}
                    </h3>
                    <p className="text-black-500 font-medium font-base" style={{ margin: 0 }}>
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, index) => (
                      <li key={`experience-point-${index}`} className="text-black-500/50 font-normal pl-1 text-sm">
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>

        {/* GitHub */}
        <GitHubActivity />

        <hr className="border-slate-200 dark:border-slate-700" />
        <CTA />
      </section>
      <ScrollToTop />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </PageTransition>
  );
};

export default About;
