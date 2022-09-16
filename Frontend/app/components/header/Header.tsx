import React from 'react'
import CTA from './CTA'
import Image from 'next/image';
import HeaderSocials from './HeaderSocials';

const Header = () => {
  return (
    <header>
      <div className="container headercontainer">
        <h5>Hello I'm</h5>
        <h1>Jonatan Schultz</h1>
        <h5 className="text-light">Fullstack developer</h5>
        <CTA />
        <HeaderSocials />
        <div className="me">
          <Image src="/man.jpg" alt="me" layout="responsive" width="513" height="640" style={{ borderRadius: "30%" }}/>  
        </div>

        <a href="#contact" className='scroll__down'>Scroll Down</a>  
      </div>  
    </header>
  )
}

export default Header