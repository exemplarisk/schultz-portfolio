import React from 'react'
import { BiCheck } from "react-icons/bi";
import { services } from "./data/services";

const Services = () => {
  return (
    <section id="services">
      <h5>What I Offer</h5>
      <h2>Services</h2>
      <div className="container services__container">
        {services.map((service) => (
          <article className="service" key={service.title}>
            <div className="service__head">
              <h3>{service.title}</h3>
            </div>
            <ul className="service__list">
              {service.items.map((item) => (
                <li key={item}>
                  <BiCheck className="service__list-icon" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services