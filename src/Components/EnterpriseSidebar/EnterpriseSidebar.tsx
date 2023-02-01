import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './EnterpriseSidebar.css';
import {IoIosSettings} from 'react-icons/io';
import {AiFillPlusCircle} from 'react-icons/ai';
import {BiMenu} from 'react-icons/bi';
import {RiLogoutBoxRLine} from 'react-icons/ri';

function EnterpriseSidebar({theme, auth, setAuth}: any) {

    let navigate = useNavigate();

    const enterpriseLoginInfo = useLocation();
    const { pathname } = useLocation();

    const location = pathname.split('/');

    const handleNavigateToMenu = () => {
        navigate('/enterprise/menu', {state: enterpriseLoginInfo.state});
    }

    const handleNavigateToManagement = () => {
        navigate(`/enterprise/management/${enterpriseLoginInfo.state}`, {state: enterpriseLoginInfo.state});
    }

    const handleNavigateToCreate = () => {
        navigate(`/enterprise/create-offer`, {state: enterpriseLoginInfo.state});
    }

    const handleUserLogout = () => {
        setAuth({...auth, login: false});
    }

    useEffect(() => {
        if (!auth.login) { navigate('/enterprise/login'); }
    }, [auth])

    return (
        <div className="enterpriseSidebar-container" style={{
            backgroundColor: theme ? '#212121' : '#F1F0F0',
            border: theme ? '1px solid #cccccc' : '1px solid #cccccc'
        }}>
            <div className="sidebar-links-container">
                {location[2] === 'management' ?
                    <button id="link" onClick={handleNavigateToMenu}>Menüü
                        <BiMenu id="setting-icon" />
                    </button>
                    :
                    <button id="link" onClick={handleNavigateToManagement}>Kuva Pakkumisi
                        <IoIosSettings id="setting-icon" />
                    </button>
                }
                <button id="link" onClick={handleNavigateToCreate}>Loo pakkumine
                    <AiFillPlusCircle id="sidebar-plus-icon" />
                </button>
            </div>
            <div className="logout-container">
                <div className="logout" style={{color: theme ? 'white' : 'black'}}>
                    <RiLogoutBoxRLine id="logout-icon" />
                    <h1 onClick={handleUserLogout}>Logi Välja</h1>
                </div>
            </div>
        </div>
    );
}

export default EnterpriseSidebar;
