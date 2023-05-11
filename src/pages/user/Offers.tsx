import React, {useState, useEffect} from 'react';
import './Offers.css';
import '../../Responsive/pages/Offers.css';
import axios from 'axios';
import {FaWallet} from 'react-icons/fa';
import {AiFillCalendar} from 'react-icons/ai';
import {BiDrink} from 'react-icons/bi';
import {ImLocation2} from 'react-icons/im';
import {HiClock} from 'react-icons/hi';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Offer from '../../Components/Offer/Offer';
import Tooltip from '@mui/material/Tooltip';

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
    const [locations, setLocations] = useState<string[]>();
    const [search, setSearch] = useState<string>();

    const handleGetLocations = () => {
        axios.get('http://localhost:3002/miits/api/user/offers/locations')
            .then((response => {
                setLocations(response.data);
            }))
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        handleGetLocations();
    }, [])

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

    const handleActive = (selected: string) => {
        return ({color: location === selected ? '#5EFFB1' : ''});
    }

    const locationFilterStyles = {
        width: locationMenu ? '7.5rem' : '0',
        height: locationMenu ? 'auto' : '0'
    };

    const mobileLocationFilterStyles = {
        width: locationMenu ? '7.5rem' : '0',
        height: locationMenu ? '6.5rem' : '0',
    };

    return (
        <>
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
                    <BiDrink 
                        id="heading-icons" 
                    />
                    <h2>Pakkumised</h2>
                    <AiFillCalendar 
                        id="heading-icons"
                    />
                    <h2>Üritused</h2>
                </div>
                <div className="grid-wrapper">
                    <div className="sideBar-container">
                        <div className="location-filter" style={window.innerWidth <= 400 ? mobileLocationFilterStyles : locationFilterStyles}>
                            <ul style={{ display: locationMenu ? '' : 'none'}}>
                                {locations && locations.map((location: string) => {
                                    return (
                                            <li data-cy={location} style={handleActive(location)} onClick={e => handleLocation(location)} key={location}>
                                                {location}
                                            </li>
                                        )
                                })}
                            </ul>
                        </div>
                        <div className="sideBar">
                            <Tooltip title="Asukohad" placement="left-start">
                                <span>
                                    <ImLocation2
                                        id="sideBar-icons"
                                        name="location"
                                        onClick={e => handleLocationSelect()}
                                    />
                                </span>
                            </Tooltip>
                            <Tooltip title="Üritused" placement="left-start">
                                <span>
                                    <AiFillCalendar
                                        id="sideBar-icons"
                                        className={selected === 'events' ? 'selected-process' : ''}
                                        data-cy="events"
                                        onClick={e => handleSelected('events')}
                                    />
                                </span>
                            </Tooltip>
                            <Tooltip title="Joogid" placement="left-start">
                                <span>
                                    <BiDrink
                                        id="sideBar-icons"
                                        className={selected === 'drinks' ? 'selected-process' : ''}
                                        data-cy="drinks"
                                        onClick={e => handleSelected('drinks')}
                                    />
                                </span>
                            </Tooltip>
                            <Tooltip title="Hind" placement="left-start">
                                <span>
                                    <FaWallet
                                        id="sideBar-icons"
                                        className={selected === 'price' ? 'selected-process' : ''}
                                        data-cy="price"
                                        onClick={e => handleSelected('price')}
                                    />
                                </span>
                            </Tooltip>
                            <Tooltip title="Kuupäev" placement="left-start">
                                <span>
                                    <HiClock
                                        id="sideBar-icons"
                                        className={selected === 'date' ? 'selected-process' : ''}
                                        data-cy="date"
                                        onClick={e => handleSelected('date')}
                                    />
                                </span>
                            </Tooltip>
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
        </>
    );
}


export default Offers;
