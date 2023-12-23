import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Contact.scss';

function Contact() {
    return (
        <div className="contact">
            {/* <h1>Connect with me</h1> */}
            <div className="contact-links">
                <a href='https://www.linkedin.com/in/roy-niladri/'>
                    <FontAwesomeIcon icon={['fab', 'linkedin']} />
                </a>
                <a href='https://ones-zeros.royniladri.dev/'>
                    <FontAwesomeIcon icon={['fas', 'chalkboard-teacher']} />
                </a>
                <a href='https://omscs.royniladri.dev/'>
                    <FontAwesomeIcon icon={['fas', 'graduation-cap']} /> {/* font awesome graduation cap */}
                </a>
                <a href='https://github.com/royNiladri/'>
                    <FontAwesomeIcon icon={['fab', 'github']} />
                </a>
                <a href='https://twitter.com/royniladri42'>
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                </a>
                <a href='https://www.instagram.com/niladriclicks/'>
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                </a>
            </div>
        </div>
    )
}

export default Contact;