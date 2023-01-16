import React, {useState} from 'react';
import './Offers.css';
import {FaWallet} from 'react-icons/fa';
import {AiFillCalendar} from 'react-icons/ai';
import {BiDrink} from 'react-icons/bi';
import {ImLocation2} from 'react-icons/im';
import {HiClock} from 'react-icons/hi';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Offer from '../../Components/Offer/Offer';

function Offers({offersData, theme, handleThemeSwitch} : any) {

    const [selected, setSelected] = useState<string>();
    const [locationMenu, setLocationMenu] = useState<boolean>(false);
    const [location, setLocation] = useState<string>();

    const handleSelected = (category: string) => {
        setSelected(category);
    }

    const handleLocationSelect = () => {
        setLocationMenu(!locationMenu);
    }

    const handleLocation = (name: string) => {
        setLocation(name);
    }

    return (
        <body style={{ backgroundColor: theme ? '#161616' : 'white'}}>
        <div>
            <Nav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            <div className="offers-section">
                <div className="headings">
                    <BiDrink id="heading-icons" />
                    <h2>Pakkumised</h2>
                    <AiFillCalendar id="heading-icons" />
                    <h2>Üritused</h2>
                </div>
                <div className="grid-wrapper">
                    <div className="sideBar-container">
                        <div  className="location-filter" style={{
                            width: locationMenu ? '35%' : '0'
                        }}>
                            <ul style={{ display: locationMenu ? '' : 'none'}}>
                                <li onClick={e => handleLocation('Tartu')}>Tartu</li>
                                <li onClick={e => handleLocation('Tallinn')}>Tallinn</li>
                                <li onClick={e => handleLocation('Pärnu')}>Pärnu</li>
                            </ul>
                        </div>
                        <div className="sideBar">
                            <ImLocation2 id="sideBar-icons" name="location" onClick={e => handleLocationSelect() } />
                            <AiFillCalendar id="sideBar-icons" onClick={e => handleSelected('events')} />
                            <BiDrink id="sideBar-icons" onClick={e => handleSelected('drinks')} />
                            <FaWallet id="sideBar-icons" onClick={e => handleSelected('price')} />
                            <HiClock id="sideBar-icons" onClick={e => handleSelected('date')} />
                        </div>
                    </div>
                    <Offer offersData={offersData} selected={selected} location={location} theme={theme} />
                </div>
            </div>
            <Footer theme={theme} />
        </div>
        </body>
    );
}


export default Offers;
