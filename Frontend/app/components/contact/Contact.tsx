import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import Chatbot from "../chatbot/Chatbot";
import ContactOption from "./ContactOption";

const Contact: React.FC = () => {
  const contactOptions = [
    {
      icon: <BsLinkedin className="contact__option-icon" />,
      platform: "LinkedIn",
      username: "Jonatan Schultz",
      link: "https://linkedin.com/in/jonatan-schultz/"
    },
    {
      icon: <RiMessengerLine className="contact__option-icon" />,
      platform: "Messenger",
      username: "Jonatan Schultz",
      link: "https://m.me/jonatan.schultz.1"
    },
    {
      icon: <MdOutlineEmail className="contact__option-icon" />,
      platform: "Email",
      username: "Jonatan Schultz",
      link: "mailto:jonatan_schultz@hotmail.com"
    }
  ];

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Let&apos;s Connect</h2>

      <div className="container contact__container">
        <div className="contact__options">
          {contactOptions.map((option, index) => (
            <ContactOption
              key={index}
              icon={option.icon}
              platform={option.platform}
              username={option.username}
              link={option.link}
            />
          ))}
        </div>
        <Chatbot />
      </div>
    </section>
  );
};

export default Contact;