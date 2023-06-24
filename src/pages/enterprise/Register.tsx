import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Register.css';
import '../../Responsive/pages/Register.css';
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {BsArrowRepeat} from 'react-icons/bs';
import {registerEnterprise} from '../../middleware/api';

interface Props {
    register: {username: string, password: string, password_repeat: string},
    setRegister: (register: any) => void
}

function Register({register, setRegister}: Props) {

    const navigate = useNavigate();

    const [registerError, setRegisterError] = useState({
        usernameError: '',
        passwordError: '',
        passwordRepeatError: ''
    });

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegister({...register, [e.target.name]: e.target.value});
    }

    const registerValidate = () => {
        let userNameError;
        let passwordError;
        let passwordRepeatError;

        if(!register.username || parseInt(register.username) < 6) {
            userNameError = 'Kasutajanimi ei saa olla tühi või lühem kui 6 tähemärki';
        }

        if(!register.password || !register.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            passwordError = 'Parool ei saa olla tühi. Parool peab sisaldama 8 tähemärki ja numbrit';
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

    const handleSubmitRegister = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = registerValidate();
        
        if (isValid) {
            try {
                await registerEnterprise(register.username, register.password);
                navigate('/enterprise/login');
            } catch (error) {
                console.log('Error trying to register an enterprise account:', error);
                throw error;
            }
        }
    }

    return (
        <div className="register-parent">
            <div className="register-main-container">
                <div className="register-form-container">
                    <form onSubmit={handleSubmitRegister} className="register-input-container">
                        <div className="register-fields">
                            <div className="input-icon">
                                <FaUserAlt />
                            </div>
                            <div className="input-field">
                                <label>Nimi:</label>
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
                                <label>Salasõna:</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                        </div>
                        <div className="register-fields">
                            <div className="input-icon">
                                <BsArrowRepeat />
                            </div>
                            <div className="input-field">
                                <label>Salasõna(u):</label>
                                <input
                                    type="password"
                                    name="password_repeat"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                        </div>
                        <button id="register" type="submit">
                            Registreeri
                        </button>
                        <div className="error-container">
                            {registerError.usernameError &&
                                <p>{registerError.usernameError}</p>
                            }
                            {registerError.passwordError && 
                                <p>{registerError.passwordError}</p>
                            }
                            {registerError.passwordRepeatError && 
                                <p data-cy="password_repeat">
                                    {registerError.passwordRepeatError}
                                </p>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
