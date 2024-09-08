import {AiOutlineHome} from 'react-icons/ai'
import { AiOutlineUser } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri"
import { BiMessageSquareDetail } from "react-icons/bi";

export const links = [
  {
    name: "home",
    href: "#",
    icon: <AiOutlineHome />,
  },
  {
    name: "about",
    href: "#about",
    icon: <AiOutlineUser />,
  },
  {
    name: "skill",
    href: "#skill",
    icon: <BiBook />,
  },
  {
    name: "services",
    href: "#services",
    icon: <RiServiceLine />,
  },
  {
    name: "contact",
    href: "#contact",
    icon: <BiMessageSquareDetail />,
  },
];
