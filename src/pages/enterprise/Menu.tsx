import React, {useEffect} from 'react';
import './Menu.css';
import Footer from '../../Components/Footer/Footer';
import EnterpriseNav from '../../Components/EnterpriseNav/EnterpriseNav';

function Menu({theme, handleThemeSwitch}: any) {

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme])

    return (
        <div>
            <EnterpriseNav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            <Footer theme={theme} />
        </div>
    );
}

export default Menu;