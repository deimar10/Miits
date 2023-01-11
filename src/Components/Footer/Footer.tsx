import React from 'react';
import './Footer.css';
import {FaFacebookSquare, FaTwitter} from 'react-icons/fa';

function Footer () {
    return (
        <footer className="footer-container">
            <div className="social-icons-container">
                <FaFacebookSquare id="footer-social-icons" />
                <FaTwitter id="footer-social-icons" />
            </div>
            <div className="logo-container">
                <img src="../../assets/logo/logo-light.png" alt="logo-light" />
            </div>
        </footer>
    );
}

export default Footer;
