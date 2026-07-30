import React from "react";
import { FaAward } from "react-icons/fa";
import { BiCode } from "react-icons/bi";
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
              <BiCode className="about__icon" />
              <h5>Role</h5>
              <small>System developer</small>
            </article>
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>5+ years</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+</small>
            </article>
          </div>
          <p>
            I&apos;m a system developer who mostly lives in the frontend. TypeScript,
            React, Next.js, and whatever CSS setup fits the job. I&apos;ve been building
            web apps for years, and I still like the work best when something complicated
            ends up feeling simple.
          </p>
          <a href="#contact" className="btn btn-primary">
            Let´s Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
