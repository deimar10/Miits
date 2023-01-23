import React from 'react';
import './Register.css';
import Design from '../../Components/Design/Design';
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {BsArrowRepeat} from 'react-icons/bs';

function Register() {
    return (
        <div className="register-main-container">
            <Design />
            <div className="register-form-container">
                <div className="enterprise-logo-container">
                    <img id="enterprise-logo" src="../assets/logo/logo-light.png" alt="logo" />
                </div>
                <div className="register-input-container">
                    <div className="register-fields">
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
                    <div className="register-fields">
                        <div className="input-icon">
                            <RiLockPasswordFill />
                        </div>
                        <div className="input-field">
                            <input type="password" name="password" />
                        </div>
                    </div>
                    <div className="register-fields">
                        <div className="input-icon">
                            <BsArrowRepeat />
                        </div>
                        <div className="input-field">
                            <input type="password" name="password_repeat" />
                        </div>
                    </div>
                    <button id="register">
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;