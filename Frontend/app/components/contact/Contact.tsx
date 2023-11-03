import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import emailjs from "emailjs-com";
import swal from "sweetalert";

const Contact = () => {
  const triggerSwal = () => {
    return swal({
      text: "Email Sent!",
      icon: "success",
      closeOnClickOutside: true,
    });
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_izlg2bj",
        "template_z33zd8m",
        e.target,
        "lSmoQpjwwaAGjB7Fi"
      )
      .then(() => {
        triggerSwal()
      });

    e.target.reset();
  };

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
        <form id="form" onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            rows={7}
            placeholder="Your Message"
            required
          />
          <button className="btn btn-primary" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
