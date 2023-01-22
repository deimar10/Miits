import React, {useState, useEffect} from 'react';
import './Nav.css';
import {OfferInterface} from "../../Interfaces/interface";
import Notifcation from '../Notification/Notification';
import {Link} from 'react-router-dom';
import {FaMoon, FaFacebookSquare, FaTwitter, FaRegBell, FaRegHeart} from 'react-icons/fa';
import {HiSun} from 'react-icons/hi';
import {TbSearch} from 'react-icons/tb';

function Nav({theme, handleThemeSwitch, handleNotificationModal, notification, setSearch, favoriteCount}: any) {

    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [isExpiring, setExpiring] = useState<OfferInterface[]>();

    useEffect(() => {
        let localFavorites = JSON.parse(localStorage.getItem('favorites') || "");

        const filteredFavorites = localFavorites.filter((favorite: any) => {
            let favoriteDate = new Date(favorite.date);
            let futureDate = new Date();

            futureDate.setDate(futureDate.getDate() + 1);
            return favoriteDate.toLocaleDateString() === futureDate.toLocaleDateString();
        });
        setExpiring(filteredFavorites);
    }, [])

    useEffect(() => {
        if (isExpiring !== undefined && isExpiring.length !== 0) {
            handleCount();
        }
    }, [isExpiring])

    const handleCount = () => {
        setIsEmpty(false);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
      <nav className="nav-container">
          <div className="nav-logo">
            <img src="../../assets/logo/logo-dark.png" alt="logo-dark" />
          </div>
          <div className="nav-input-container">
              {!theme ? <FaMoon id="theme" onClick={handleThemeSwitch} /> : <HiSun id="theme" onClick={handleThemeSwitch} />}
              <TbSearch id="search-icon" />
              <input
                  type="text"
                  name="search"
                  placeholder="e.g Triple-Effect"
                  id="search"
                  onChange={handleSearch}
              />
              <FaFacebookSquare id="social-icons" />
              <FaTwitter id="social-icons" />
          </div>
          <div className="nav-icons-container">
              <Link to={'/offers/favorites'}>
                  <FaRegHeart id="nav-icons" />
                  {favoriteCount !== 0 ? <p id="fav-count">{favoriteCount}</p> : null}
              </Link>
              <FaRegBell className="bell-icon" id="nav-icons" onClick={handleNotificationModal} />
              {!isEmpty ? <span id="notification-count"></span> : null}
              {notification ? <Notifcation isExpiring={isExpiring} theme={theme} notification={notification} /> : null}
          </div>
      </nav>
    );
}

export default Nav;
