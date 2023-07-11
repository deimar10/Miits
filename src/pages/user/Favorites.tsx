import React, {useEffect} from 'react';
import {useNavigate, Link} from "react-router-dom";
import {OfferInterface} from "../../Interfaces";
import './Favorites.css';
import '../../Responsive/pages/Favorites.css';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import {FaHeart} from 'react-icons/fa';
import {HiChevronLeft} from 'react-icons/hi';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
    theme: boolean,
    handleThemeSwitch(): void,
    handleNotificationModal(): void,
    notification: boolean,
    favorites: Array<any>,
    setFavorites: (favorites: any) => void,
    offersData: any,
    setOffers: (offers: any) => void
}

function Favorites({theme, handleThemeSwitch, handleNotificationModal, notification, favorites, setFavorites, offersData, setOffers}: Props) {

    let navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate(-1);
    }

    const handleRemoveFavorite = (id: number) => {
        let filterFavorite = favorites.filter((favorite: OfferInterface ) => favorite.id !== id);
        let offers = [...offersData];

        offers.map((offer: OfferInterface) => {
            if (offer.id === id) {return offer.favorite = false;}
        })

        localStorage.setItem('favorites', JSON.stringify(filterFavorite));

        setOffers(offers);
        setFavorites(filterFavorite);
    }

    useEffect(() => {
        if (localStorage.getItem('favorites') !== null) {
            setFavorites(JSON.parse(localStorage.getItem('favorites') || ""));
        }
    }, [])

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme])

    const screen = window.innerWidth <= 395;

    return (
        <>
            <Nav
                theme={theme}
                handleThemeSwitch={handleThemeSwitch}
                handleNotificationModal={handleNotificationModal}
                notification={notification}
            />
            <div className="header-container">
                <FaHeart id="favorite-icon" />
                <h2 style={{color: theme ? 'white' : 'black'}}>
                    Lemmikud({favorites.length})
                </h2>
            </div>
            <div className="nav-back-container" style={{color: theme ? 'white' : 'black'}}>
               <span 
                   data-cy="nav-back" 
                   onClick={handleNavigateBack}
               >
                    <HiChevronLeft id="back-icon" />
                    <h3>Tagasi</h3>
               </span>
            </div>
            {favorites?.length !== 0 ?
            <div className="favorites-main-container">
                {favorites.map((favorite: OfferInterface) => {
                    return (
                        <div className="favorites-grid-item" key={favorite.id}>
                            <div className="offer-image">
                                <LazyLoadImage
                                    id="offer-favorite"
                                    src={favorite.image}
                                    alt={`favorite-${favorite.title}`}
                                    effect="opacity"
                                    width={screen ? '100%' : '92.5%'}
                                    height={'100%'}
                                />
                            </div>
                            <div className="offer-description-container">
                                <div className="offer-description" style={{color: theme ? 'white' : 'black'}}>
                                    <h3>Asukoht:
                                        <span> {favorite.location}</span>
                                    </h3>
                                    <h3>Kirjeldus:
                                        <span> {favorite.description}</span>
                                    </h3>
                                </div>
                                <div className="offer-date-container">
                                    <p>Kuupäev: {favorite.date}</p>
                                    <Link id="read-more" to={`/offers/offer-details/${favorite.slug}`}>
                                        Loe lähemalt
                                    </Link>
                                    <button onClick={() => handleRemoveFavorite(favorite.id)}>
                                        Eemalda
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div> : <div className="offers-empty">
                        <p id="offers-empty-text" style={{color: theme ?
                                'white' : '#161616'
                        }}>
                            Ükski pakkumine ei ole valitud lemmikuks!
                        </p>
                 </div>
            }
            <Footer theme={theme} />
        </>
    );
}
export default Favorites;
