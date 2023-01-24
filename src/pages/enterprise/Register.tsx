import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Register.css';
import Design from '../../Components/Design/Design';
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {BsArrowRepeat} from 'react-icons/bs';

function Register({register, setRegister}: any) {

    const navigate = useNavigate();

    const [registerError, setRegisterError] = useState({
        usernameError: '',
        passwordError: '',
        passwordRepeatError: ''
    });

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegister({...register, [e.target.name]: e.target.value});
    }

    const handleSubmitRegister = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = validate();

        if(isValid) {
            setRegisterError({...registerError, passwordError: '', passwordRepeatError: '', usernameError: ''});
            navigate('/enterprise/login');
        }
    }

    const validate = () => {
        let userNameError;
        let passwordError;
        let passwordRepeatError;

        if(!register.username || parseInt(register.username) < 6) {
            userNameError = 'Kasutajanimi ei saa olla tühi või lühem kui 6 tähemärki';
        }

        if(!register.password || !register.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            passwordError = 'Parool ei saa ola tühi. Parool peab sisaldama 8 tähemärki ja numbrit';
        }

        if(register.password_repeat !== register.password) {
            passwordRepeatError = 'Paroolid peavad ühtima';
        }

        if(userNameError) {
            setRegisterError({...registerError, usernameError: userNameError});
            return false;
        }

        if(passwordError) {
            setRegisterError({...registerError, passwordError: passwordError});
            return false;
        }

        if(passwordRepeatError) {
            setRegisterError({...registerError, passwordRepeatError: passwordRepeatError});
            return false;
        }
        return true;
    }

    return (
        <div className="register-main-container">
            <Design />
            <div className="register-form-container">
                <div className="enterprise-logo-container">
                    <img id="enterprise-logo" src="../assets/logo/logo-light.png" alt="logo" />
                </div>
                <form onSubmit={handleSubmitRegister} className="register-input-container">
                    {registerError.usernameError ? <p id="error-validate">{registerError.usernameError}</p> : null}
                    {registerError.passwordError ? <p id="error-validate">{registerError.passwordError}</p> : null}
                    {registerError.passwordRepeatError ? <p id="error-validate">{registerError.passwordRepeatError}</p> : null}
                    <div className="register-fields">
                        <div className="input-icon">
                            <FaUserAlt />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                name="username"
                                placeholder="e.g Shooters"
                                onChange={handleRegisterChange}
                            />
                        </div>
                    </div>
                    <div className="register-fields">
                        <div className="input-icon">
                            <RiLockPasswordFill />
                        </div>
                        <div className="input-field">
                            <input type="password" name="password" onChange={handleRegisterChange} />
                        </div>
                    </div>
                    <div className="register-fields">
                        <div className="input-icon">
                            <BsArrowRepeat />
                        </div>
                        <div className="input-field">
                            <input type="password" name="password_repeat" onChange={handleRegisterChange} />
                        </div>
                    </div>
                    <button id="register" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
