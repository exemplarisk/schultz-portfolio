import React from 'react';
import { Skill } from './types/skill';
import { BsPatchCheckFill } from 'react-icons/bs';

interface SkillItemProps {
  skill: Skill;
}

export const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  const { name, level } = skill;

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

export default SkillItem;