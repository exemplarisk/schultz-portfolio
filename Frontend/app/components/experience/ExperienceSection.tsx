import React from 'react';
import ExperienceItem from './ExperienceItem';

const ExperienceSection = ({ experiences }) => {
  return (
    <div className="experience-section">
      {experiences.map((experience, index) => (
        <ExperienceItem key={index} experience={experience} />
      ))}
    </div>
  );
};

export default ExperienceSection;