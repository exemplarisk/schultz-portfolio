import React from 'react';
import ExperienceDetails from './ExperienceDetails';
import ExperienceDescription from './ExperienceDescription';

const ExperienceItem = ({ experience }) => {
  const { role, company, date, responsibilities } = experience;

  return (
    <div className="experience-item">
      <ExperienceDetails role={role} company={company} date={date} />
      <ExperienceDescription responsibilities={responsibilities} />
    </div>
  );
};

export default ExperienceItem;