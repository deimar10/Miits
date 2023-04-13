import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './OfferDetails.css';
import '../../Responsive/pages/OfferDetails.css';
import axios from 'axios';
import {OfferInterface} from "../../Interfaces/index";
import {feedback} from "../../Interfaces/index";
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import FeedbackSuccess from '../../Components/FeedbackSuccess/FeedbackSuccess';
import {FaRegHeart, FaHeart} from 'react-icons/fa';
import {HiChevronLeft} from 'react-icons/hi';

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

function OfferDetails ({offersData, theme, handleThemeSwitch, handleNotificationModal, notification, favoriteCount, favorites, setFavorites, setOffers}: Props) {

    const navigate = useNavigate();
    let { slug } = useParams();

    const offer = offersData.find((offer: OfferInterface) => offer.slug === slug);

    const [offerSelected, setOfferSelected] = useState<OfferInterface | any>({...offer});
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<feedback>({
        name: "",
        comment: "",
        nameError: "",
        commentError: ""
    });
    const [success, setSuccess] = useState<boolean>(false);

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

        handleGetSingleOffer();
    }, [slug, offersData])

    const handleGetSingleOffer = () => {
        axios.get(`http://localhost:3002/miits/api/user/offers/offer-details/${slug}`)
            .then(response => {
                setOfferSelected(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme])

    const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeedback({...feedback,  [e.target.name] : e.target.value});
    }

    const handleFormSubmit = () => {
        let isValid = handleValidate();

        if(isValid) {
            let offerFeedback = [...offerSelected.feedback];

            axios.post(`http://localhost:3002/miits/api/user/feedback/${slug}`, {
                name: feedback.name,
                comment: feedback.comment
            })
                .then(response => {
                    setFeedback({...feedback,
                        commentError: "",
                        nameError: "",
                        name: "",
                        comment: ""
                    });

                    offerFeedback.push(response.data);
                    setOfferSelected({...offerSelected, feedback: offerFeedback});
                })
                .catch(error => {
                    console.log(error);
                });

            setSuccess(true);
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

    useEffect(() => {
        setTimeout(() => setSuccess(false), 1250);
    }, [offerSelected.feedback.length])

    return (
        <div style={{color: theme ? 'white' : 'black'}}>
            <Nav
                theme={theme}
                handleThemeSwitch={handleThemeSwitch}
                favoriteCount={favoriteCount}
                handleNotificationModal={handleNotificationModal}
                notification={notification}
            />
            <div className="details-nav-back-container" >
                <span onClick={handleNavigateBack}>
                    <HiChevronLeft id="back-icon" />
                    <h3>Tagasi</h3>
                </span>
            </div>
            <div className="details-main-container">
                <div className="details-grid-item">
                    <div className="details-image">
                        <img 
                            src={offerSelected.image} 
                            alt="offer" 
                        />
                    </div>
                    <div className="addToFavorites-container">
                        <span>
                            {isFavorite ? 
                                <FaHeart id="fav-icon" /> 
                                : 
                                <FaRegHeart 
                                    data-cy="unmarked" 
                                    id="fav-icon" 
                                    onClick={handleAddToFavorites} 
                                />
                            }
                            <h3>Lisa lemmikuks</h3>
                         </span>
                        <p>Kuupäev: {offerSelected.date}</p>
                    </div>
                    <div className="details-description">
                        <h3 data-cy="title">
                            Tiitel: <span>{offerSelected.title}</span>
                        </h3>
                        <h3 data-cy="category">
                            Kategooria: <span>{offerSelected.category}</span>
                        </h3>
                        <h3 data-cy="location">
                            Asukoht: <span>{offerSelected.location}</span>
                        </h3>
                        <h3 data-cy="description">
                            Kirjeldus: <span>{offerSelected.description}</span>
                        </h3>
                        <h3 data-cy="price">
                            Hind: <span>{offerSelected.price}€</span>
                        </h3>
                    </div>
                </div>
                <div className="details-feedback-container">
                    <h2>Kasutaja Tagasiside</h2>
                    {success &&
                        <FeedbackSuccess />
                    }
                    <div className="user-feedback-container" style={{overflowY: offerSelected.feedback.length <= 2 ? 'hidden' : 'scroll'}}>
                        {offerSelected.feedback.length !== 0 ? offerSelected.feedback.map((feedback: {comment: string, name: string, tagasiside_id: string}) => {
                            return (
                                <div className="user-feedback" key={feedback.tagasiside_id}>
                                    <h3>{feedback.name}</h3>
                                    <p data-cy="comment">
                                        {feedback.comment}
                                    </p>
                                </div>
                            )
                        }) : <p id="empty-feedback">
                                Tundub, et ühtegi tagasisidet ei ole lisatud. 
                                Julgelt lisage kommentaar.
                            </p>
                        }
                    </div>
                    <div className="details-form-container">
                        <label>Eesnimi</label>
                        {feedback.nameError &&
                            <p data-cy="name-error" id="error-validate">
                                {feedback.nameError}
                            </p>
                        }
                        <input
                            id="form-name"
                            type="text"
                            placeholder="e.g Mari"
                            name="name"
                            value={feedback.name}
                            onChange={handleFeedbackChange}
                            style={{
                                backgroundColor: theme ? '#161616' : 'white',
                                color: theme ? 'white' : 'black'
                            }}
                        />
                        <label>Tagasiside</label>
                        {feedback.commentError &&
                            <p id="error-validate">
                                {feedback.commentError}
                            </p>
                        }
                        <input
                            id="form-feedback"
                            type="text"
                            name="comment"
                            value={feedback.comment}
                            onChange={handleFeedbackChange}
                            style={{
                                backgroundColor: theme ? '#161616' : 'white',
                                color: theme ? 'white' : 'black'
                            }}
                        />
                        <button id="form-submit" onClick={handleFormSubmit}>
                            Salvesta
                        </button>
                    </div>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    );
}

export default OfferDetails;
