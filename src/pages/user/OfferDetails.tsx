import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './OfferDetails.css';
import {OfferInterface} from "../../Interfaces/interface";
import {feedback} from "../../Interfaces/interface";
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import {FaRegHeart, FaHeart} from 'react-icons/fa';
import {HiChevronLeft} from 'react-icons/hi';
import {AiFillPlusCircle} from 'react-icons/ai';

function OfferDetails ({offersData, theme, handleThemeSwitch, favoriteCount, favorites, setFavorites, setOffers}: any) {

    const navigate = useNavigate();
    let { slug } = useParams();

    const offer = offersData.find((offer: OfferInterface) => offer.slug === slug);

    const [offerSelected, setOfferSelected] = useState<OfferInterface>({...offer});
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<feedback>({
        name: "",
        comment: "",
        nameError: "",
        commentError: ""
    });

    const handleNavigateBack = () => {
        navigate(-1);
    }

    const handleAddToFavorites = () => {
        let offers = [...offersData];

        offers.map((offer: OfferInterface) => {
            if (offer.id === offerSelected.id) {return offer.favorite = true;}
        })

        let localFavorite = JSON.parse(localStorage.getItem('favorites') || "");
        localFavorite.push(offerSelected);

        localStorage.setItem('favorites', JSON.stringify(localFavorite));

        setOffers(offers);
        setFavorites([...favorites, offerSelected]);
    }

    useEffect(() => {
        let localFavorites = JSON.parse(localStorage.getItem('favorites') || "");

        if (localFavorites.find((favorite: OfferInterface) => favorite.id === offerSelected.id) !== undefined) {
            setIsFavorite(true);
        }

        setOfferSelected({...offer});
    }, [slug, offersData])

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme])

    const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeedback({...feedback,  [e.target.name] : e.target.value});
    }

    const handleFormSubmit = () => {
        let isValid = handleValidate();

        if(isValid) {
            let offers = [...offersData];
            let offerFeedback = [...offerSelected.feedback];

            offerFeedback.push(feedback);
            setOfferSelected({...offerSelected, feedback: offerFeedback});

            offers.map((offer: OfferInterface) => {
                if (offer.slug === offerSelected.slug) {return offer.feedback = offerFeedback;}
            })
            setOffers(offers);
            setFeedback({...feedback, commentError: "", nameError: ""});
        }
    }

    const handleValidate = (): boolean => {
        let nameError = "";
        let commentError = "";

        if(!feedback.name) {nameError = "Nimi peab olema lisatud!";}

        if(!feedback.comment) {commentError = "Kommentaar peab olema lisatud!";}

        if(nameError) {
            setFeedback({...feedback, nameError : nameError});
            return false;
        }

        if(commentError) {
            setFeedback({...feedback, commentError : commentError});
            return false;
        }
        return true;
    }

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
                        <span>
                            {isFavorite ? <FaHeart id="fav-icon" /> : <FaRegHeart id="fav-icon" onClick={handleAddToFavorites} />}
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
                <div className="details-feedback-container">
                    <h2>Users Feedback</h2>
                    <div className="user-feedback-container" style={{overflowY: offerSelected.feedback.length <= 2 ? 'hidden' : 'scroll'}}>
                        {offerSelected.feedback.length !== 0 ? offerSelected.feedback.map((feedback: {comment: string, name: string}) => {
                            return (
                                <div className="user-feedback" key={feedback.comment}>
                                    <h3>{feedback.name}</h3>
                                    <p>{feedback.comment}</p>
                                </div>
                            )
                        }) : <p id="empty-feedback">Tundub, et ühtegi tagasisidet ei ole lisatud. Julgelt lisage kommentaar.</p>}
                    </div>
                    <div className="details-form-container">
                        <label>First Name</label>
                        {feedback.nameError ? <p id="error-validate">{feedback.nameError}</p> : null}
                        <input
                            id="form-name"
                            type="text"
                            placeholder="e.g Mari"
                            name="name"
                            onChange={handleFeedbackChange}
                            style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                        />
                        <label>Feedback</label>
                        {feedback.commentError ? <p id="error-validate">{feedback.commentError}</p> : null}
                        <input
                            id="form-feedback"
                            type="text"
                            placeholder="e.g Väga lahe pakkumine. Kindlasti kaasan oma sõbrad"
                            name="comment"
                            onChange={handleFeedbackChange}
                            style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                        />
                        <button id="form-submit" onClick={handleFormSubmit}><AiFillPlusCircle id="plus-icon" />
                            submit
                        </button>
                    </div>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    );
}

export default OfferDetails;
