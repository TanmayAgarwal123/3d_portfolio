import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React from 'react';
import { skills, experiences } from '../constants';
import CTA from '../components/CTA';


const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Tanmay</span>
      </h1>
      <div className="flex mt-5 flex-col gap-3 text-slate-500">
        <p> 
            As a dedicated Software Engineer from India, I'm driven by a strong desire for knowledge and aim to make a 
            significant impact on society. I enthusiastically welcome challenges as chances to innovate and bring about 
            positive change, constantly seeking opportunities for learning and growth.
        </p>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className='subhead-text'>My Skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill)=>(
              <div className='block-container w-20 h-20'>
                <div className='btn-back rounded-xl'/>
                <div className='btn-front rounded-xl flex justify-center items-center'>
                  <img
                    src={skill.imageUrl}
                    art={skill.name}
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience</h3>
          <div className="flex mt-5 flex-col gap-3 text-slate-500">
          <p> 
              I've worked will all sorts of people and companies, 
              leveling up my skills and teaming up with smart people.
              <br/> Here's the rundown:
          </p>
        </div>

        <div className='mt-12 flex'>
            <VerticalTimeline>
              {experiences.map((experience)=>(
                <VerticalTimelineElement
                  key={experience.company_name}
                  date={experience.date}
                  icon={<div className='flex justify-center items-center h-full w-full'>
                    <img 
                    src={experience.icon}
                    alt={experience.company_name}
                    className='w-[60%] h-[60%] object-contain'
                    />
                  </div>}
                  iconStyle={{ background: experience.iconBg }}
                  contentStyle={{
                    borderBottom: '8px',
                    borderStyle: 'solid',
                    borderBottomColor: experience.iconBg,
                    boxShadow: 'none',
                  }}
                >
                  <div>
                    <h3 className='text-black text-xl font-poppins font-semibold'>
                      {experience.title}
                    </h3>
                    <p className='text-black-500 font-medium font-base' style={{margin:0}}>
                      {experience.company_name}
                    </p>
                  </div>

                  <ul className='my-5 list-disc ml-5 space-y-2'>
                    {experience.points.map((point,index)=>(
                      <li key={`experience-point-${index}`} className='text-black-500/50 font-normal pl-1 text-sm'>
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
        </div>
      </div>

      <hr className='border-slate-200'/>
      <CTA />
    </section>
  )
}

export default About