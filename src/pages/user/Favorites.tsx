import React from 'react';
import {useNavigate} from "react-router-dom";
import {OfferInterface} from "../../Interfaces/interface";
import './Favorites.css';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import {FaHeart} from 'react-icons/fa';
import {HiChevronLeft} from 'react-icons/hi';

function Favorites({theme, handleThemeSwitch, favorites}: any) {

    let navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate(-1);
    }

    return (
        <div style={{ backgroundColor: theme ? '#161616' : 'white'}}>
            <Nav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            <div className="header-container">
                <FaHeart id="favorite-icon" />
                <h2 style={{color: theme ? 'white' : 'black'}}>
                    Favorites({favorites.length})
                </h2>
            </div>
            <div className="nav-back-container" style={{color: theme ? 'white' : 'black'}}>
               <span onClick={handleNavigateBack}>
                    <HiChevronLeft id="back-icon" />
                    <h3>Go Back</h3>
               </span>
            </div>
            <div className="favorites-main-container">
                {favorites.map((favorite: OfferInterface) =>{
                    return (
                        <div className="favorites-grid-item" key={favorite.id}>
                            <div className="offer-image">
                                <img src={favorite.image} alt="offer" />
                            </div>
                            <div className="offer-description-container">
                                <div className="offer-description" style={{color: theme ? 'white' : 'black'}}>
                                    <h3>Location:
                                        <span> {favorite.location}</span>
                                    </h3>
                                    <h3>Description:
                                        <span> {favorite.description}</span>
                                    </h3>
                                </div>
                                <div className="offer-date-container">
                                    <p>Date: {favorite.date}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Footer theme={theme} />
        </div>
    );
}
export default Favorites;
