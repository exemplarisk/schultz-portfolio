import React from 'react';

const ExperienceDetails = ({ role, company, date }) => {
  return (
    <div className="experience-details">
      <h3>{role}</h3>
      <p>{company}</p>
      <span>{date}</span>
    </div>
  );
};

export default ExperienceDetails;