import React from 'react'
import { experiences } from './data/experiences';
import ExperienceSection from './ExperienceSection';

const Experience = () => (
  <section id="experience">
    <h2>Experience</h2>
    <ExperienceSection experiences={experiences} />
  </section>
);

export default Experience