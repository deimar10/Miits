import React, {useEffect, useState} from 'react';
import './Login.css';
import '../../Responsive/pages/Login.css';
import axios from 'axios';
import {login} from '../../Interfaces/interface';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {HiOutlineArrowNarrowRight} from 'react-icons/hi';

interface Props {
    setAuth: (auth: any) => void,
    auth: object
}

function Login({setAuth, auth}: Props) {

    const navigate = useNavigate();

    const [login, setLogin] = useState<login>({
        username: '',
        password: ''
    });
    const [loginError, setLoginError] = useState({
        usernameError: '',
        passwordError: ''
    });

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const loginValidate = () => {
        let nameError;
        let passwordError;

        if(!login.username) {
            nameError = 'Kasutajanimi ei saa olla tühi';
        }

        if(!login.password || !login.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            passwordError = 'Parool ei saa ola tühi. Parool peab sisaldama 8 tähemärki ja numbrit';
        }

        if(nameError) {
            setLoginError({...loginError, usernameError: nameError});
            return false;
        }

        if(passwordError) {
            setLoginError({...loginError, passwordError: passwordError});
            return false;
        }
        return true;
    }

    const handleSubmitLogin = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = loginValidate();

        if(isValid && process.env.REACT_APP_LOGIN) {
            axios.post(process.env.REACT_APP_LOGIN, {
                username: login.username,
                password: login.password
            }).then(response => {
                if (response.data.auth) {
                    setAuth({...auth, login: response.data.auth});

                    navigate("/enterprise/menu", {state: login.username});
                } else {
                    setAuth({...auth, login: response.data.auth});
                }
            }).catch(error => {
                console.log(error);
                setLoginError({...loginError, passwordError: 'Paroolid ei ühti. Sissepääs keelatud.'});
            });
        }
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
    }, [])

    return (
        <div className="login-parent">
            <div className="login-main-container">
                <div className="login-illustration-container">
                    <img src="../assets/logo/logo-dark.png" alt="logo" />
                </div>
                <div className="login-form-container">
                    <form onSubmit={handleSubmitLogin} className="login-input-container">
                        <div className="login-error-container">
                            {loginError.usernameError ? <p>{loginError.usernameError}</p> : null}
                            {loginError.passwordError ? <p id="password-error">{loginError.passwordError}</p> : null}
                        </div>
                        <div className="login-fields">
                            <div className="input-icon">
                                <FaUserAlt />
                            </div>
                            <div className="input-field">
                                <label>Nimi:</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="e.g Shooters"
                                    onChange={handleLoginChange}
                                />
                            </div>
                        </div>
                        <div className="login-fields">
                            <div className="input-icon">
                                <RiLockPasswordFill />
                            </div>
                            <div className="input-field">
                                <label>Salasõna:</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleLoginChange}
                                />
                            </div>
                        </div>
                        <button type="submit" id="login">
                            Sisene
                        </button>
                        <div className="nav-to-register">
                            <Link id="navigate" to={"/enterprise/register"}>
                                Loo konto <span><HiOutlineArrowNarrowRight /></span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
