import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Contact.scss";

function Contact() {
  return (
    <div className="contact">
      <div className="contact-links">
        <div>
          <a href="https://www.linkedin.com/in/roy-niladri/">
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </a>
          <p>LinkedIn</p>
        </div>
        <div>
          <a href="https://github.com/royNiladri/">
            <FontAwesomeIcon icon={["fab", "github"]} />
          </a>
          <p>GitHub</p>
        </div>
        <div>
          <a href="https://omscs.royniladri.dev/">
            <FontAwesomeIcon icon={["fas", "graduation-cap"]} />
          </a>
          <p>OMSCS Journey</p>
        </div>
        <div>
          <a href="https://ones-zeros.royniladri.dev/">
            <FontAwesomeIcon icon={["fas", "chalkboard-teacher"]} />
          </a>
          <p>Blog</p>
        </div>
        <div>
          <a href="https://www.instagram.com/niladriclicks/">
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>
          <p>Instagram</p>
        </div>
        <div>
          <a href="https://twitter.com/royniladri42">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
          <p>Twitter</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
