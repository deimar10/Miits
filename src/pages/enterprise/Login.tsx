import React from 'react';
import './Login.css';
import Design from '../../Components/Design/Design';
import {Link} from 'react-router-dom';
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';

function Login() {
    return (
        <div className="login-main-container">
            <Design />
            <div className="login-form-container">
                <div className="enterprise-logo-container">
                    <img src="../assets/logo/logo-light.png" alt="logo" />
                </div>
                <div className="login-input-container">
                    <div className="login-fields">
                        <div className="input-icon">
                            <FaUserAlt />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                name="username"
                                placeholder="e.g Shooters"
                            />
                        </div>
                    </div>
                    <div className="login-fields">
                        <div className="input-icon">
                            <RiLockPasswordFill />
                        </div>
                        <div className="input-field">
                            <input type="password" name="password" />
                        </div>
                    </div>
                    <button id="login">
                        Login
                    </button>
                    <div className="nav-to-register">
                        <p>Ei ole kontot juba registreerinud?</p>
                        <Link id="navigate" to={"/enterprise/register"}>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;