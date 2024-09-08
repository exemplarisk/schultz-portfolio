import React from "react";
import { ContactOptionProps } from "./types/contact";

const ContactOption: React.FC<ContactOptionProps> = ({ icon, platform, username, link }) => (
  <article className="contact__option">
    {icon}
    <h4>{platform}</h4>
    <h5>{username}</h5>
    <a href={link} target="_blank" rel="noopener noreferrer">
      Send a message
    </a>
  </article>
);

export default ContactOption;