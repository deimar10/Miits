import React from 'react';
import {useNavigate} from "react-router-dom";
import './Favorites.css';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import {FaHeart} from 'react-icons/fa';
import {HiChevronLeft} from 'react-icons/hi';

function Favorites({theme, handleThemeSwitch}: any) {

    let navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate(-1);
    }

    return (
        <div style={{ backgroundColor: theme ? '#161616' : 'white'}}>
            <Nav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            <div className="header-container">
                <FaHeart id="favorite-icon" />
                <h2>Favorites(3)</h2>
            </div>
            <div className="nav-back-container">
               <span onClick={handleNavigateBack}>
                    <HiChevronLeft id="back-icon" />
                    <h3>Go Back</h3>
               </span>
            </div>
            <Footer theme={theme} />
        </div>
    );
}
export default Favorites;
