import React from 'react';
import './Nav.css';
import Notifcation from '../Notification/Notification';
import {Link} from 'react-router-dom';
import {FaMoon, FaFacebookSquare, FaTwitter, FaRegBell, FaRegHeart} from 'react-icons/fa';
import {HiSun} from 'react-icons/hi';
import {TbSearch} from 'react-icons/tb';

function Nav({theme, handleThemeSwitch, handleNotificationModal, notification, setSearch, favoriteCount} : any) {

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
              {notification ? <Notifcation /> : null}
          </div>
      </nav>
    );
}

export default Nav;
