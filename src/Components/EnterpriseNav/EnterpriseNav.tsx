import React from 'react';
import {useLocation} from 'react-router-dom';
import './EnterpriseNav.css';
import {FaMoon} from 'react-icons/fa';
import {HiSun} from 'react-icons/hi';

function EnterpriseNav({theme, handleThemeSwitch}: any) {

    const enterpriseLoginInfo = useLocation();

    return (
        <nav className="enterprise-nav-container">
            <div className="enterpriseLogo-container">
                <img src="../../assets/logo/logo-dark.png" alt="logo-dark" />
            </div>
            <div className="enterpriseName-container">
                {!theme ? <FaMoon id="theme" onClick={handleThemeSwitch} /> : <HiSun id="theme" onClick={handleThemeSwitch} />}
                <h1>{enterpriseLoginInfo.state}</h1>
            </div>
        </nav>
    )
}

export default EnterpriseNav;
