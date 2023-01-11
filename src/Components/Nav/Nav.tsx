import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import {FaMoon, FaFacebookSquare, FaTwitter, FaRegBell} from 'react-icons/fa';
import {FaRegHeart} from 'react-icons/fa';
import {TbSearch} from 'react-icons/tb';

function Nav() {
    return (
      <nav className="nav-container">
          <div className="nav-logo">
            <img src="../../assets/logo/logo-dark.png" alt="logo-dark" />
          </div>
          <div className="nav-input-container">
              <FaMoon id="theme" />
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
            <FaRegBell id="nav-icons" />
          </div>
      </nav>
    );
}

export default Nav;
