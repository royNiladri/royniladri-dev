import React from 'react';
import './Footer.scss';


function Footer() {
    return (
        <footer className="footer">
            <span>&copy; {new Date().getFullYear()} Niladri Roy</span>
        </footer>
    );
}

export default Footer;