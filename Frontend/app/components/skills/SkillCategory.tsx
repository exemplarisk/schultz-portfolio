import React from "react";
import SkillItem from "./SkillItem";
import { Skill } from "./types/skill";

interface SkillCategoryProps {
  title: string;
  items: Skill[];
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({ title, items }) => (
  <section className="skillsGroup">
    <h3 className="skillsGroup__title">{title}</h3>
    <ul className="skillsGroup__list">
      {items.map((skill) => (
        <SkillItem key={skill.name} skill={skill} />
      ))}
    </ul>
  </section>
);

export default SkillCategory;
