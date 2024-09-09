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
          <a href="https://linkedin.com/in/jonatan-schultz/" target="_blank" title="linkedin">
            <BsLinkedin />
          </a>
          <a href="https://github.com/exemplarisk" target="_blank" title="github">
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