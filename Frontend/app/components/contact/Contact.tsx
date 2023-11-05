import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import ChatbotComponent from "../chatbot/Chatbot";

const Contact = () => {

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>let's connect</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <BsLinkedin className="contact__option-icon" />
            <h4>Linkedin</h4>
            <h5>Jonatan Schultz</h5>
            <a href="https://linkedin.com/in/jonatan-schultz/" target="blank">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <RiMessengerLine className="contact__option-icon" />
            <h4>Messenger</h4>
            <h5>Jonatan Schultz</h5>
            <a href="https://m.me/jonatan.schultz.1" target="blank">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon" />
            <h4>Email</h4>
            <h5>Jonatan Schultz</h5>
            <a href="mailto:jonatan_schultz@hotmail.com" target="blank">
              Send a message
            </a>
          </article>
        </div>
        <ChatbotComponent />
      </div>
    </section>
  );
};

export default Contact;
