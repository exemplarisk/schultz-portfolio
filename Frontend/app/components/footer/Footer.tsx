import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { links } from "./data/links";

const Footer = () => {
  return (
    <footer>
      <a href="#" className="footer__logo">
        Jonatan Schultz
      </a>
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
    </footer>
  );
};

export default Footer;
