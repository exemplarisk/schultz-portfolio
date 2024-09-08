import React from "react";
import { skills } from "./data/skills";
import { SkillContainer } from "./SkillContainer";

export const SkillSection = () => (
  <section id="experience">
    <h5>My Skills</h5>
    <h2>Expertise & Proficiency</h2>
    <SkillContainer skills={skills} />
  </section>
);

export default SkillSection;