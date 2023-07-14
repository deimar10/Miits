import React, {useEffect, useState} from 'react';
import './Login.css';
import '../../Responsive/pages/Login.css';
import {login} from '../../Interfaces';
import {Link, useNavigate} from 'react-router-dom';
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {HiOutlineArrowNarrowRight} from 'react-icons/hi';
import {loginEnterprise} from '../../middleware/api';

interface Props {
    setAuth: (auth: any) => void,
    auth: object,
    admin: boolean,
    setAdmin: (admin: boolean) => void
}

function Login({setAuth, auth, admin, setAdmin}: Props) {

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
            passwordError = 'Parool ei saa olla tühi. Parool peab sisaldama 8 tähemärki ja numbrit';
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

    const handleSubmitLogin = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = loginValidate();
        
        if(isValid) {
            try {
                const enterpriseSession = await loginEnterprise(login.username, login.password);
                
                switch (true) {
                    case enterpriseSession.auth: {
                        localStorage.setItem('session_id', JSON.stringify(enterpriseSession.session));
                        
                        setAuth({...auth, login: enterpriseSession.auth});

                        navigate("/enterprise/menu", {state: login.username});
                        return;
                    }
                    case enterpriseSession.admin: {
                        setAuth({...auth, login: false});
                        setAdmin(true);
                        
                        navigate("/admin");
                        return;
                    }
                }
            } catch (error) {
                console.log('Error trying to login enterprise account:', error);
                setLoginError({...loginError, passwordError: 'Paroolid ei ühti. Sissepääs keelatud.'});
            }
        }
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
    }, [])

    return (
        <div className="login-parent">
            <div className="login-main-container">
                <div className="login-illustration-container">
                    <img 
                        src="../assets/logo/logo-dark.png" 
                        alt="logo" 
                    />
                </div>
                <div className="login-form-container">
                    <form onSubmit={handleSubmitLogin} className="login-input-container">
                        <div className="login-error-container">
                            {loginError.usernameError &&
                                <p>{loginError.usernameError}</p>
                            }
                            {loginError.passwordError &&
                                <p id="password-error">
                                    {loginError.passwordError}
                                </p>
                            }
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
                                Loo konto
                                <span>
                                    <HiOutlineArrowNarrowRight />
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
