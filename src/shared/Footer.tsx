import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <span role="copyright">&copy; {new Date().getFullYear()} Niladri Roy</span>
        </footer>
    );
}

export default Footer;