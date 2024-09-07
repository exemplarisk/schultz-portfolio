import React from "react";
import ExperienceItem from "./ExperienceItem";
import { Skill } from "./types/skill";

interface ExperienceCategoryProps {
  title: string;
  items: Skill[];
}

export const ExperienceCategory: React.FC<ExperienceCategoryProps> = ({ title, items }) => (
  <>
    <h3>{title}</h3>
    <div className="experience__content">
      {items.map((experience, index) => (
        <ExperienceItem key={index} experience={experience} />
      ))}
    </div>
  </>
);

export default ExperienceCategory;
