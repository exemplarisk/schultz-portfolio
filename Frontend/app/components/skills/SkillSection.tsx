import React from "react";
import { skills } from "./data/skills";
import { SkillContainer } from "./SkillContainer";

export const SkillSection = () => (
  <section id="skill">
    <h5>My Skills</h5>
    <h2>What I work with</h2>
    <SkillContainer skills={skills} />
  </section>
);

export default SkillSection;
