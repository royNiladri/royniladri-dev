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
                <a href='https://github.com/royNiladri/'>
                    <FontAwesomeIcon icon={['fab', 'github']} />
                </a>
                <a href='https://www.instagram.com/niladriclicks/'>
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                </a>
                {/* <a href='https://www.patreon.com/royniladri'>
                    <FontAwesomeIcon icon={['fab', 'patreon']} />
                </a> */}
                <a href='https://ones-zeros.royniladri.dev/' className="hashnode">
                </a>
                <a href='mailto:reachout@royniladri.dev'>
                    <FontAwesomeIcon icon={['far', 'envelope']} />
                </a>
                <a href='https://twitter.com/royniladri42'>
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                </a>
                <a href='https://www.reddit.com/user/nilroyy'>
                    <FontAwesomeIcon icon={['fab', 'reddit']} />
                </a>
            </div>
        </div>
    )
}

export default Contact;