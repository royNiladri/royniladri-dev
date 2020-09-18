import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Contact.scss';

function Contact() {
    return (
        <div className="contact">
            <h1>Connect with me</h1>
            <div className="contact-links">
                <a href='https://www.linkedin.com/in/roy-niladri/'>
                    <FontAwesomeIcon icon={['fab', 'linkedin']} size="4x" />
                </a>
                <a href='https://github.com/royNiladri/'>
                    <FontAwesomeIcon icon={['fab', 'github']} size="4x" />
                </a>
                <a href='https://www.instagram.com/niladriclicks/'>
                    <FontAwesomeIcon icon={['fab', 'instagram']} size="4x" />
                </a>
                <a href='https://www.patreon.com/royniladri'>
                    <FontAwesomeIcon icon={['fab', 'patreon']} size="4x" />
                </a>
                <a href='mailto:reachout@royniladri.dev'>
                    <FontAwesomeIcon icon={['far', 'envelope']} size="4x" />
                </a>
                <a href='https://twitter.com/roynil92'>
                    <FontAwesomeIcon icon={['fab', 'twitter']} size="4x" />
                </a>
                <a href='https://www.reddit.com/user/nilroyy'>
                    <FontAwesomeIcon icon={['fab', 'reddit']} size="4x" />
                </a>
            </div>
        </div>
    )
}

export default Contact;