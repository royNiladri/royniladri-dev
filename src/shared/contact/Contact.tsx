import React from "react";
import "./Contact.scss";
import { GitHub, HistoryEdu, Instagram, LinkedIn, School, Twitter } from "@mui/icons-material";

function Contact() {
  return (
    <div className="contact">
      <div className="contact-links">
        <div>
          <a href="https://www.linkedin.com/in/roy-niladri/" className="linkedin">
            <LinkedIn />
          </a>
          <p>LinkedIn</p>
        </div>
        <div>
          <a href="https://github.com/royNiladri/" className="github">
            <GitHub />
          </a>
          <p>GitHub</p>
        </div>
        <div>
          <a href="https://omscs.royniladri.dev/" className="school">
            <School />
          </a>
          <p>OMSCS Journey</p>
        </div>
        <div>
          <a href="https://ones-zeros.royniladri.dev/" className="blog">
            <HistoryEdu />
          </a>
          <p>Blog</p>
        </div>
        <div>
          <a href="https://www.instagram.com/niladriclicks/" className="instagram">
            <Instagram />
          </a>
          <p>Instagram</p>
        </div>
        <div>
          <a href="https://twitter.com/royniladri42" className="twitter">
            <Twitter />
          </a>
          <p>Twitter</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
