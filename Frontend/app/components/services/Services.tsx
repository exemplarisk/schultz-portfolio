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
              <BiCheck className="service__list_icon" />
              <p>Web development using modern frameworks</p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>Release and deploy</p>
            </li>
          </ul>
        </article>
        <article className="service">
          <div className="service__head">
            <h3>Agile transformation and Quality Assurance</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
          </ul>
        </article>
        <article className="service">
          <div className="service__head">
            <h3>Project Management</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
            <li>
              <BiCheck className="service__list_icon" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, esse?
              </p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Services