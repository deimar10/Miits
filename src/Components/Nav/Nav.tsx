import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import {FaMoon, FaFacebookSquare, FaTwitter, FaRegBell, FaRegHeart} from 'react-icons/fa';
import {HiSun} from 'react-icons/hi';
import {TbSearch} from 'react-icons/tb';

function Nav({theme, handleThemeSwitch} : any) {
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
                  placeholder="e.g GigaBang Shooters"
                  id="search"
              />
              <FaFacebookSquare id="social-icons" />
              <FaTwitter id="social-icons" />
          </div>
          <div className="nav-icons-container">
              <Link to={'/offers/favorites'}>
                  <FaRegHeart id="nav-icons" />
              </Link>
              <FaRegBell className="bell-icon" id="nav-icons" />
          </div>
      </nav>
    );
}

export default Nav;
