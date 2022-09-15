import React from 'react'
import styles from './header.module.css'
import CTA from './CTA'
import Image from 'next/image';

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Jonatan Schultz</h1>
        <h5 className="text-light">Fullstack developer</h5>
        <CTA />

        <div className="me">
          <Image src="/man.jpg" alt="" layout="responsive" width="513" height="640"/>  
        </div>  
      </div>  
    </header>
  )
}

export default Header