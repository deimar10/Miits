import React from 'react';
import './Footer.css';
import '../../Responsive/components/Footer.css';
import {FaFacebookSquare, FaTwitter} from 'react-icons/fa';

function Footer ({theme} : any) {
    return (
        <footer className="footer-container" style={{ backgroundColor: theme ? '#212121' : '#F1F0F0'}}>
            <div className="social-icons-container">
                <FaFacebookSquare id="footer-social-icons" style={{color: theme ? 'white' : 'black'}} />
                <FaTwitter id="footer-social-icons" style={{color: theme ? 'white' : 'black'}} />
            </div>
            <div className="logo-container">
                {theme ?
                    <img src="../../assets/logo/logo-dark.png" alt="logo-light" /> 
                    :
                    <img src="../../assets/logo/logo-light.png" alt="logo-light" />
                }
            </div>
        </footer>
    );
}

export default Footer;
