import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './OfferDetails.css';
import {OfferInterface} from "../../Interfaces/interface";
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import {FaRegHeart, FaHeart} from 'react-icons/fa';
import {HiChevronLeft} from "react-icons/hi";

function OfferDetails ({offersData, theme, handleThemeSwitch, favoriteCount}: any) {

    const navigate = useNavigate();
    let { slug } = useParams();

    const offer = offersData.find((offer: OfferInterface) => offer.slug === slug);

    const [offerSelected, setOfferSelected] = useState<OfferInterface>({...offer});

    const handleNavigateBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        setOfferSelected({...offer});
    }, [slug])

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme])

    return (
        <div style={{color: theme ? 'white' : 'black'}}>
            <Nav theme={theme} handleThemeSwitch={handleThemeSwitch} favoriteCount={favoriteCount} />
            <div className="details-nav-back-container" >
                <span onClick={handleNavigateBack}>
                    <HiChevronLeft id="back-icon" />
                    <h3>Go Back</h3>
                </span>
            </div>
            <div className="details-main-container">
                <div className="details-grid-item">
                    <div className="details-image">
                        <img src={offerSelected.image} alt="offer" />
                    </div>
                    <div className="addToFavorites-container">
                        <span onClick={handleNavigateBack}>
                            <FaRegHeart id="fav-icon" />
                            <h3>Add to favorites</h3>
                         </span>
                        <p>Date: {offerSelected.date}</p>
                    </div>
                    <div className="details-description">
                        <h3>
                            Title:<span> {offerSelected.title}</span>
                        </h3>
                        <h3>
                            Category:<span> {offerSelected.category}</span>
                        </h3>
                        <h3>
                            Location:<span> {offerSelected.location}</span>
                        </h3>
                        <h3>
                            Description:<span> {offerSelected.description}</span>
                        </h3>
                        <h3>
                            Price:<span> {offerSelected.price}€</span>
                        </h3>
                    </div>
                </div>
                <div className="details-feedback-container" style={{overflowY: offerSelected.feedback.length <= 2 ? 'hidden' : 'scroll'}}>
                    <h2>Users Feedback</h2>
                    {offerSelected.feedback.map((feedback: {comment: string, name: string}) => {
                        return (
                            <div className="user-feedback" key={feedback.comment}>
                                <h3>{feedback.name}</h3>
                                <p>{feedback.comment}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    );
}

export default OfferDetails;
