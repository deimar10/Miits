import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './EnterpriseSidebar.css';
import '../../Responsive/components/EnterpriseSidebar.css';
import {IoIosSettings} from 'react-icons/io';
import {BiMenu} from 'react-icons/bi';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import {BsPlus} from 'react-icons/bs';
import {getOfferCount} from '../../middleware/api';

interface Props {
    theme: boolean,
    auth: any,
    setAuth: (auth: any) => void,
    created?: boolean
}

function EnterpriseSidebar({theme, auth, setAuth, created}: Props) {

    const [count, setCount] = useState<number>(0);

    let navigate = useNavigate();

    const enterpriseLoginInfo = useLocation();
    const { pathname } = useLocation();

    const location = pathname.split('/');

    const offerCountUrl = `${process.env.REACT_APP_GET_OFFER_COUNT}/${enterpriseLoginInfo.state}/count`;

    const handleEnterpriseOfferCount = async () => {
        try {
            const offerCount = await getOfferCount(offerCountUrl);
            setCount(offerCount);
        } catch (error) {
            console.log('Error requesting offer count:', error);
            throw error;
        }
    }

    useEffect(() => {
        handleEnterpriseOfferCount();
    }, [created])
    
    const handleNavigateToMenu = () => {
        navigate('/enterprise/menu', {state: enterpriseLoginInfo.state});
    }

    const handleNavigateToManagement = () => {
        navigate(`/enterprise/management/${enterpriseLoginInfo.state}`, 
            {state: enterpriseLoginInfo.state});
    }

    const handleNavigateToCreate = () => {
        navigate(`/enterprise/create-offer`, 
            {state: enterpriseLoginInfo.state});
    }

    const handleUserLogout = () => {
        setAuth({...auth, login: false});
    }
    
    return (
        <div className="enterpriseSidebar-container">
            <div className="sidebar-links-container">
                {location[2] === 'management' ?
                    <button id="link" onClick={handleNavigateToMenu}>
                        <BiMenu id="setting-icon" />
                        Menüü
                    </button>
                    :
                    <button data-cy="nav-to-offers" id="link" onClick={handleNavigateToManagement}>
                        <IoIosSettings id="setting-icon" />
                        Pakkumised
                        <span id="offer-count">
                            {count}
                        </span>
                    </button>
                }
                {location[2] === 'create-offer' ?
                    <button id="link" onClick={handleNavigateToMenu}>
                        <BiMenu id="setting-icon" />
                        Menüü
                    </button>
                    :
                    <button data-cy="nav-to-create-offer" id="link" onClick={handleNavigateToCreate}>
                        <BsPlus id="sidebar-plus-icon" />
                        Loo pakkumine
                    </button>
                }
            </div>
            <div className="logout-container">
                <div className="logout">
                    <RiLogoutBoxRLine
                        id="logout-icon"
                    />
                    <h1 data-cy="logout" onClick={handleUserLogout}>
                        Logi Välja
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default EnterpriseSidebar;
