import React from "react";
import { Skill, SkillLevel } from "./types/skill";

interface SkillItemProps {
  skill: Skill;
}

const levelRank: Record<SkillLevel, number> = {
  Beginner: 1,
  Proficient: 2,
  Advanced: 3,
  Expert: 4,
};

export const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  const { name, level } = skill;
  const rank = levelRank[level];

  return (
    <li className="skillChip">
      <div className="skillChip__top">
        <span className="skillChip__name">{name}</span>
        <span className="skillChip__level">{level}</span>
      </div>
      <div
        className="skillChip__meter"
        role="img"
        aria-label={`${level} level`}
      >
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={`skillChip__dot${step <= rank ? " is-on" : ""}`}
          />
        ))}
      </div>
    </li>
  );
};

export default SkillItem;
