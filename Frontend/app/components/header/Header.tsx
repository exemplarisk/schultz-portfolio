import Image from 'next/image';
import React from 'react'
import CTA from './CTA'
import HeaderSocials from './HeaderSocials';
import DLSAvatar from '../avatar/DLSAvatar';

const Header = () => {
  return (
    <>
      <header>
        <div className="container headercontainer">
          <h5>Hello I'm</h5>
          <h1>Jonatan Schultz</h1>
          <h5 className="text-light">
            Ideas Engineer & Miscellaneous Specialist
          </h5>
          <CTA />
          <HeaderSocials />
          <div className="me">
            <Image
              alt="me"
              layout="responsive"
              width="513"
              height="640"
              style={{ borderRadius: "30%" }}
              src="/bulb.jpg"
            />
          </div>
          <a href="#contact" className="scroll__down">
            Scroll Down
          </a>
          <DLSAvatar />
        </div>
      </header>
    </>
  );
}

export default Header