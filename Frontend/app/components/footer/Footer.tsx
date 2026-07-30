import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { links } from "./data/links";
import QuoteCarousel from "../quoteCarousel/QuoteCarousel";

const Footer = () => {
  return (
    <footer>
      <section style={{ marginTop: "2rem" }}>
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
          <a href="https://linkedin.com/in/jonatan-schultz/" target="_blank" rel="noreferrer" title="linkedin">
            <BsLinkedin />
          </a>
          <a href="https://github.com/exemplarisk" target="_blank" rel="noreferrer" title="github">
            <FaGithub />
          </a>
          <button
            type="button"
            className="footer__cvClassified"
            title="CV is classified"
            aria-label="CV is classified and not publicly available"
            onClick={(event) => {
              const button = event.currentTarget;
              button.dataset.flipped = button.dataset.flipped === "1" ? "0" : "1";
              button.textContent =
                button.dataset.flipped === "1" ? "Nice try" : "CV 🔒";
            }}
          >
            CV 🔒
          </button>
        </div>

        <div className="footer__copyright">
          <small>&copy; Jonatan Schultz</small>
        </div>
      </section>
    </footer>
  );
};

export default Footer;