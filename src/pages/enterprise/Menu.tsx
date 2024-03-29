import React, {useEffect} from 'react';
import './Menu.css';
import '../../Responsive/pages/Menu.css';
import EnterpriseNav from '../../Components/EnterpriseNav/EnterpriseNav';
import EnterpriseSidebar from '../../Components/EnterpriseSidebar/EnterpriseSidebar';
import {BiDrink} from 'react-icons/bi';
import {AiFillCalendar} from 'react-icons/ai';

interface Props {
    theme: boolean,
    handleThemeSwitch(): void,
    auth: any,
    setAuth: (auth: any) => void,
}

function Menu({theme, handleThemeSwitch, auth, setAuth}: Props) {

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme])

    return (
        <>
            <EnterpriseNav 
                theme={theme} 
                handleThemeSwitch={handleThemeSwitch}
            />
            <div className="menu-container">
                <EnterpriseSidebar 
                    theme={theme} 
                    auth={auth} 
                    setAuth={setAuth} 
                />
                <div className="menu-introduction" style={{color: theme ? 'white' : 'black'}}>
                    <h1>
                        Loo uus pakkumine,
                        muuda pakkumist või kustuta pakkumine
                    </h1>
                    <BiDrink 
                        id="menu-icon" 
                    />
                    <AiFillCalendar 
                        id="menu-icon" 
                    />
                </div>
            </div>
        </>
    );
}

export default Menu;