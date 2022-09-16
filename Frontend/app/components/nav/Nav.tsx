import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import { AiOutlineUser } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri"
import { BiMessageSquareDetail } from "react-icons/bi";


const Nav = () => {
  return (
    <nav>
      <a href="#" className="">
        <AiOutlineHome />
      </a>
      <a href="#about" className="">
        <AiOutlineUser />
      </a>
      <a href="#experience" className="">
        <BiBook />
      </a>
      <a href="#services" className="">
        <RiServiceLine />
      </a>
      <a href="#contact" className="">
        <BiMessageSquareDetail />
      </a>
    </nav>
  );
}

export default Nav