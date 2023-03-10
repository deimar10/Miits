import React, {useState, useEffect} from 'react';
import './Offers.css';
import '../../Responsive/pages/Offers.css';
import {FaWallet} from 'react-icons/fa';
import {AiFillCalendar} from 'react-icons/ai';
import {BiDrink} from 'react-icons/bi';
import {ImLocation2} from 'react-icons/im';
import {HiClock} from 'react-icons/hi';
import {IoIosRefreshCircle} from 'react-icons/io';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Offer from '../../Components/Offer/Offer';

interface Props {
    theme: boolean,
    handleThemeSwitch(): void,
    handleNotificationModal(): void,
    notification: boolean,
    favorites: Array<any>,
    favoriteCount: any,
    setFavorites: (favorites: any) => void,
    offersData: any,
    setOffers: (offers: any) => void
}

function Offers({offersData, theme, handleThemeSwitch, handleNotificationModal, notification, favorites, setFavorites, favoriteCount, setOffers}: Props) {

    const [selected, setSelected] = useState<string>();
    const [locationMenu, setLocationMenu] = useState<boolean>(false);
    const [location, setLocation] = useState<string>();
    const [search, setSearch] = useState<string>();

    const handleSelected = (category: string) => {
        setSelected(category);
    }

    const handleLocationSelect = () => {
        setLocationMenu(!locationMenu);
    }

    const handleLocation = (name: string) => {
        setLocation(name);
    }

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme])

    const locationFilterStyles = {
        width: locationMenu ? '7.5rem' : '0',
        height: locationMenu ? 'auto' : '0'
    };

    const mobileLocationFilterStyles = {
        width: locationMenu ? '7.5rem' : '0',
        height: locationMenu ? '6.5rem' : '0',
    };

    return (
        <div>
            <Nav
                theme={theme}
                handleThemeSwitch={handleThemeSwitch}
                setSearch={setSearch}
                favoriteCount={favoriteCount}
                handleNotificationModal={handleNotificationModal}
                notification={notification}
            />
            <div className="offers-section">
                <div className="headings">
                    <BiDrink id="heading-icons" />
                    <h2>Pakkumised</h2>
                    <AiFillCalendar id="heading-icons" />
                    <h2>Üritused</h2>
                </div>
                <div className="grid-wrapper">
                    <div className="sideBar-container">
                        <div className="location-filter" style={window.innerWidth <= 400 ? mobileLocationFilterStyles : locationFilterStyles}>
                            <ul style={{ display: locationMenu ? '' : 'none'}}>
                                <li data-cy="Tartu" onClick={e => handleLocation('Tartu')}>Tartu</li>
                                <li data-cy="Pärnu" onClick={e => handleLocation('Tallinn')}>Tallinn</li>
                                <li data-cy="Tallinn" onClick={e => handleLocation('Pärnu')}>Pärnu</li>
                            </ul>
                        </div>
                        <div className="sideBar">
                            <ImLocation2 id="sideBar-icons" name="location" onClick={e => handleLocationSelect() } />
                            <AiFillCalendar id="sideBar-icons" data-cy="events" onClick={e => handleSelected('events')} />
                            <BiDrink id="sideBar-icons" data-cy="drinks" onClick={e => handleSelected('drinks')} />
                            <FaWallet id="sideBar-icons" data-cy="price" onClick={e => handleSelected('price')} />
                            <HiClock id="sideBar-icons" data-cy="date" onClick={e => handleSelected('date')} />
                        </div>
                    </div>
                    <Offer
                        offersData={offersData}
                        selected={selected}
                        location={location}
                        theme={theme}
                        search={search}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setOffers={setOffers}
                    />
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    );
}


export default Offers;
