import React from 'react';
import {useLocation} from 'react-router-dom';
import './EnterpriseNav.css';
import '../../Responsive/components/EnterpriseNav.css';
import {FaMoon} from 'react-icons/fa';
import {HiSun} from 'react-icons/hi';

interface Props {
    theme: boolean,
    handleThemeSwitch(): void
}

function EnterpriseNav({theme, handleThemeSwitch}: Props) {

    const enterpriseLoginInfo = useLocation();
    const { pathname } = useLocation();

    const navLocations = () => {
        switch (pathname) {
            case `/enterprise/menu`:
                return location[0];
            case `/enterprise/create-offer`:
                return location[2];
            case `/enterprise/management/${enterpriseLoginInfo.state}`:
                return location[1];
            default:
                return 'Edit'
        }
    }

    const location = ['Menu', 'Management', 'Create'];

    return (
        <nav className="enterprise-nav-container" style={{ boxShadow: theme ? '2px 0 6px 0 black' : '2px 0 6px 0 #494949'}}>
            <div className="enterprise-logo-container">
                <img
                    src="../../assets/logo/logo-dark.png"
                    alt="logo-dark"
                />
            </div>
            <div className="enterprise-settings-container">
                {!theme ?
                    <FaMoon
                        id="theme-light"
                        onClick={handleThemeSwitch}
                    />
                    :
                    <HiSun
                        id="theme-dark"
                        onClick={handleThemeSwitch}
                    />
                }
                <p id="enterprise-nav-location">
                    {navLocations()}
                </p>
                <h1 data-cy="login-info" style={{ color: theme ? 'white' : 'black'}}>
                    {enterpriseLoginInfo.state}
                </h1>
            </div>
        </nav>
    )
}

export default EnterpriseNav;
