import React from 'react'
import { BsPatchCheckFill } from 'react-icons/bs';
import { experience } from './data/experience';

const Experience = () => {
  return (
    <section id="experience">
      <h5>My Skills</h5>
      <h2>expertise & proficiency</h2>
      <div className="container experience__container">
        <div className="experience__dev">
          <h3>Frontend Development</h3>
          <div className="experience__content">
            {experience.frontend.map((skill, index) => (
              <article className="experience__details" key={index}>
                <BsPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>{skill.name}</h4>
                  <small className="text-light">{skill.level}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="experience__dev">
          <h3>Backend Development</h3>
          <div className="experience__content">
            {experience.backend.map((skill, index) => (
              <article className="experience__details" key={index}>
                <BsPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>{skill.name}</h4>
                  <small className="text-light">{skill.level}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="container essential__experience">
        <div className="experience__dev">
          <h3>Essential Skills</h3>
          <div className="experience__content">
            {experience.essential.map((skill, index) => (
              <article className="experience__details" key={index}>
                <BsPatchCheckFill className="experience__details-icon" />
                <div>
                  <h4>{skill.name}</h4>
                  <small className="text-light">{skill.level}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Experience