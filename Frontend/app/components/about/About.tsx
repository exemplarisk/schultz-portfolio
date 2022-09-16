import next from 'next'
import React from 'react'
import { FaAward } from 'react-icons/fa'
import { BiCode } from "react-icons/bi";
import {VscFolderLibrary} from 'react-icons/vsc'
import Image from 'next/image'

const About = () => {
  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <Image
              width="946px"
              height="1048px"
              src="/section2.jpg"
              alt="img"
            ></Image>
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
              <small>2+ years working experience</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+</small>
            </article>
          </div>

          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere adipisci sit corporis voluptatem dolor harum nihil odit ratione non accusantium distinctio, architecto praesentium officiis facilis! Veniam inventore fugiat voluptatem voluptatibus dolore dolorem asperiores quis maxime voluptates quidem tenetur minima odio aliquam officiis quod, aliquid velit sint reprehenderit maiores nemo eos.</p>

          <a href="#contact" className="btn btn-primary">Let´s Talk</a>
        </div>
      </div>
    </section>
  );
}

export default About