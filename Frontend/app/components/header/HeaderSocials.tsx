import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaGithub } from "react-icons/fa";
import { FiDribbble } from "react-icons/fi"


const HeaderSocials = () => {
  return (
    <div className='header__socials'>
      <a href="https://linkedin.com/in/jonatan-schultz/" target="blank">
        <BsLinkedin/>
      </a>
      <a href="https://github.com/exemplarisk" target="blank">
        <FaGithub />
      </a>
      <a href="https://dribbble.com" target="blank">
        <FiDribbble />
      </a>
    </div>
  );
}

export default HeaderSocials