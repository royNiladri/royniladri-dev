import React from 'react';
import Support from './Support';


function Footer() {
    return (
        <footer className="footer">
            <Support></Support>
            <span>&copy; {new Date().getFullYear()} Niladri Roy</span>
        </footer>
    );
}

export default Footer;