import React from 'react';
import { Skill } from './types/skill';
import { BsPatchCheckFill } from 'react-icons/bs';

interface ExperienceItemProps {
  experience: Skill;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  const { name, level } = experience;

  return (
    <article className="experience__details">
      <BsPatchCheckFill className="experience__details-icon" />
      <div>
        <h4>{name}</h4>
        <small className="text-light">{level}</small>
      </div>
    </article>
  );
};

export default ExperienceItem;