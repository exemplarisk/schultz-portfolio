import React from "react";
import { FaAward } from "react-icons/fa";
import { BiCode } from "react-icons/bi";
import { VscFolderLibrary } from "react-icons/vsc";
import DLSAvatar from "../avatar/DLSAvatar";

const About = () => {
  const modelSrc = "https://models.readyplayer.me/65415b4d8b8b05014d60106c.glb";

  return (
    <section id="about" className="about">
      <h5>Get To Know</h5>
      <h2>about me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div style={{ pointerEvents: "none" }} className="about__me-image">
            <DLSAvatar
              modelSrc={modelSrc}
              animationSrc="/drums.fbx"
              cameraInitialDistance={5}
              cameraTarget={1.3}
            />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <BiCode className="about__icon" />
              <h5>Role</h5>
              <small>System developer & Tech Lead</small>
            </article>
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>3+ years working experience</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+</small>
            </article>
          </div>
          <p>
            I am a System developer with continuous desire to learn. I have been
            developing web applications for four years, and for two years
            professionally. I am specialized in frontend development using
            TypeScript, React, NextJS, MaterialUI, ChakraUI, TailwindCSS, Styled
            Components and more highend tools and frameworks!
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