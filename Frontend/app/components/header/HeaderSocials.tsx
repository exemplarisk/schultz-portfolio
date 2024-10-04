import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
      <a 
        href="https://linkedin.com/in/jonatan-schultz/" 
        target="_blank" 
        title="LinkedIn" 
        rel="noopener noreferrer"
        aria-label="Go to my LinkedIn profile"
      >
        <BsLinkedin />
      </a>
      <a 
        href="https://github.com/exemplarisk" 
        target="_blank" 
        title="GitHub" 
        rel="noopener noreferrer"
        aria-label="Go to my GitHub profile"
      >
        <FaGithub />
      </a>
    </div>
  );
}

export default HeaderSocials;