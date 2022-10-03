import React from 'react'
import { useState } from 'react';
import { links } from '../utils/navlinks'


const Nav = () => {
  const [active, setActive] = useState('#')
  return (
    <nav>
      {links.map((x) => {
        return (
          <a
            key={x.name}
            aria-label={x.name}
            href={x.href}
            onClick={() => setActive(x.href)}
            className={active === x.href ? "active" : ""}
          >{x.icon}</a>
        );
      })}
    </nav>
  );
}

export default Nav