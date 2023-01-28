import React, {useEffect, useState} from 'react';
import './Login.css';
import {login} from '../../Interfaces/interface';
import Design from '../../Components/Design/Design';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {HiOutlineArrowNarrowRight} from 'react-icons/hi';

function Login({register, setAuth, auth}: any) {

    const navigate = useNavigate();

    const [login, setLogin] = useState<login>({
        username: '',
        password: ''
    });
    const [loginError, setLoginError] = useState({
        userError: '',
        passwordError: ''
    });

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const loginValidate = () => {
        let userError;
        let passwordError;

        if(!register.username || register.username !== login.username) {
            userError = "Vale kasutajatunnus";
        }

        if(!register.password || register.password !== login.password) {
            passwordError = "Vale parool";
        }

        if(userError) {
            setLoginError({...loginError, userError: userError});
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

        if(isValid) {
            setLoginError({...loginError, userError: '', passwordError: ''});
            setAuth({...auth, login: true});

            navigate("/enterprise/menu", {state: login.username});
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
                            {loginError.userError ? <p>{loginError.userError}</p> : null}
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
                            Login
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
