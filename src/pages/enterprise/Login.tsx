import React, {useState} from 'react';
import './Login.css';
import {login} from '../../Interfaces/interface';
import Design from '../../Components/Design/Design';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';

function Login({register}: any) {

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

        if(register.username !== login.username) {
            userError = "Vale kasutajatunnus";
        }

        if(register.password !== login.password) {
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
            navigate("/");
        }
    }

    return (
        <div className="login-main-container">
            <Design />
            <div className="login-form-container">
                <div className="enterprise-logo-container">
                    <img src="../assets/logo/logo-light.png" alt="logo" />
                </div>
                <form onSubmit={handleSubmitLogin} className="login-input-container">
                    {loginError.userError ? <p id="error-validate">{loginError.userError}</p> : null}
                    {loginError.passwordError ? <p id="error-validate">{loginError.passwordError}</p> : null}
                    <div className="login-fields">
                        <div className="input-icon">
                            <FaUserAlt />
                        </div>
                        <div className="input-field">
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
                        <p>Ei ole kontot juba registreerinud?</p>
                        <Link id="navigate" to={"/enterprise/register"}>
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
