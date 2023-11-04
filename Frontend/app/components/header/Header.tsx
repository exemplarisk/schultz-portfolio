import Image from 'next/image';
import React from 'react'
import CTA from './CTA'
import HeaderSocials from './HeaderSocials';
import DLSAvatar from '../avatar/DLSAvatar';

const Header = () => {

  const modelSrc =
    "https://models.readyplayer.me/65415b4d8b8b05014d60106c.glb";


  return (
    <>
      <header>
        <div className="container headercontainer">
          <h5 style={{ color: "#959595" }}>Introducing</h5>
          <h1>Jonatan Schultz</h1>
          <h5 className="text-light">
            Ideas Engineer & Miscellaneous Specialist
          </h5>
          <CTA />
          <div style={{ pointerEvents: "none" }} className="DLSAvatar">
            <DLSAvatar
              modelSrc={modelSrc}
              animationSrc="/Salute.fbx"
              cameraInitialDistance={5}
            />
          </div>
          <HeaderSocials />
          <a href="#contact" className="scroll__down">
            Scroll Down
          </a>
        </div>
      </header>
    </>
  );
}

export default Header