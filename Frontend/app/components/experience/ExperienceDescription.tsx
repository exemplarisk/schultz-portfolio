import React from 'react';

const ExperienceDescription = ({ responsibilities }) => {
  return (
    <ul className="experience-description">
      {responsibilities.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default ExperienceDescription;