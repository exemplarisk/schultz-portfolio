import React from "react";
import { FaAward, FaUsers } from "react-icons/fa";
import { VscFolderLibrary } from "react-icons/vsc";
import AboutSnapshot from "./AboutSnapshot";

const About = () => {
  return (
    <section id="about" className="about">
      <h5>Get To Know</h5>
      <h2>about me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__visual">
            <AboutSnapshot />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaUsers className="about__icon" />
              <h5>Focus</h5>
              <small>Ideas Engineer</small>
            </article>
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>7+ years</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+</small>
            </article>
          </div>
          <p>
            I focus on development leadership and change management. The work is
            holding a direction, building ways of working people can actually use, and
            carrying a change through so it shows up in the organisation. Technology
            stays in the picture where it serves that: priorities, structure, and
            follow-through, with the people doing the work at the centre.
          </p>
          <a href="#contact" className="btn btn-primary">
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
