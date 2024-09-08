import React from "react";
import SkillItem from "./SkillItem";
import { Skill } from "./types/skill";

interface SkillCategoryProps {
  title: string;
  items: Skill[];
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({ title, items }) => (
  <>
    <h3>{title}</h3>
    <div className="skill__content">
      {items.map((skill, index) => (
        <SkillItem key={index} skill={skill} />
      ))}
    </div>
  </>
);

export default SkillCategory;
