import React from 'react'
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <a href="#" className="footer__logo">
        Jonatan Schultz
      </a>

      <ul className="permalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="experience">Experience</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#portfolio">Recent Work</a>
        </li>
        <li>
          <a href="#story">About Me</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
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
}

export default Footer