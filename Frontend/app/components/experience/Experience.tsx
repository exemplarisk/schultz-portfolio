import React from "react";
import { experiences } from "./data/experiences";
import { ExperienceSection } from "./ExperienceSection";

export const Experience = () => (
  <section id="experience">
    <h5>My Skills</h5>
    <h2>Expertise & Proficiency</h2>
    <ExperienceSection experiences={experiences} />
  </section>
);

export default Experience;