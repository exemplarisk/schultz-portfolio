import React from 'react'
import CTA from './CTA'
import HeaderSocials from './HeaderSocials';
import PartyParticles from '../particles/PartyParticles';

const Header = () => {
  return (
    <>
      <PartyParticles />
      <header>
        <div className="container headercontainer">
          <h5>Hello I'm</h5>
          <h1>Jonatan Schultz</h1>
          <h5 className="text-light">Fullstack developer</h5>
          <CTA />
          <HeaderSocials />
          <div className="me">
            <iframe
              className="frame__player"
              src="https://open.spotify.com/embed/track/5cpCqye5HUbsy7kNZcOhbD?utm_source=generator&theme=0"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
          <a href="#contact" className="scroll__down">
            Scroll Down
          </a>
        </div>
      </header>
    </>
  );
}

export default Header