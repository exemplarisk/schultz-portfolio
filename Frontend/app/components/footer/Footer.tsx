import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { links } from "./data/links";
import QuoteCarousel from "../quoteCarousel/QuoteCarousel";

const Footer = () => {
  return (
    <footer>
      <section style={{ marginTop: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            color: "#FFFFFF",
            textShadow: "2px 2px 4px #000000",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          My Philosophical Footprint
        </h2>
        <h3>impressions of wisdom</h3>
        <QuoteCarousel />
        <ul className="permalinks">
          {links.map((x) => {
            return (
              <li key={x.name}>
                <a href={x.href}>{x.name}</a>
              </li>
            );
          })}
        </ul>
        <div className="footer__socials">
          <a href="https://linkedin.com/in/jonatan-schultz/" target="blank">
            <BsLinkedin />
          </a>
          <a href="https://github.com/exemplarisk">
            <FaGithub />
          </a>
          <a href="/cv.pdf">CV</a>
        </div>

        <div className="footer__copyright">
          <small>&copy; Jonatan Schultz</small>
        </div>
      </section>
    </footer>
  );
};

export default Footer;