import React from 'react'
import { BiCheck } from "react-icons/bi";

const Services = () => {
  return (
    <section id="services">
      <h5>What I Offer</h5>
      <h2>Services</h2>

      <div className="container services__container">
        <article className="service">
          <div className="service__head">
            <h3>System/Web development</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Responsive Web development</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Mobile Applications</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>E-Commerce Development</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Content Management System Setup</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Databases and APIs</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Cloud Computing</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Release and deployment</p>
            </li>
          </ul>
        </article>
        <article className="service">
          <div className="service__head">
            <h3>Organisational Transformation</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Agile Transformation</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Scrum/Kanban Transition</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Communications Strategy</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Culture evolution strategies</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Team Building</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Vision Setting</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Security First</p>
            </li>
          </ul>
        </article>
        <article className="service">
          <div className="service__head">
            <h3>Project Management</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Agile Project Management</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Resource Management</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Estimating</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Planning and Scheduling</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Document Control</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>JIRA/DEVOPS</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Quality Assurance</p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Services