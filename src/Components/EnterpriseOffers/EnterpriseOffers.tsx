import React, {useEffect, useState, useMemo} from 'react';
import './EnterpriseOffers.css';
import '../../Responsive/components/EnterpriseOffers.css';
import {OfferInterface} from '../../Interfaces/index';
import UserFeedback from '../UserFeedback/UserFeedback';
import {BiDrink, BiCheck} from 'react-icons/bi';
import {AiFillCalendar, AiOutlineClose, AiOutlineEdit} from 'react-icons/ai';
import {MdOutlineFeedback} from 'react-icons/md';
import {TfiTrash} from 'react-icons/tfi';
import {handleOfferStatus} from '../../utils/index';

interface Props {
    theme: boolean,
    enterpriseOffers: OfferInterface[],
    handleDeleteNotification(e: any, id: number): void,
    handleEditOffer(e: any, title: string): void,
    upcoming: boolean
}

function EnterpriseOffers({theme, enterpriseOffers, handleDeleteNotification, handleEditOffer, upcoming}: Props) {

    const [processed, setProcessed] = useState<OfferInterface[]>([]);
    const [viewFeedbackModal, setView] = useState<boolean>(false);
    const [selectedFeedback, setFeedback] = useState<object>({
        title: '',
        feedback: [],
    });

    const handleCheckOfferStatus = () => {
        const checkOfferStatus = handleOfferStatus(enterpriseOffers);

        setProcessed(checkOfferStatus);
    }

    useEffect(() => {
        handleCheckOfferStatus();
    }, [enterpriseOffers])

    const handleShowFeedbackModal = (feedback: object[], title: string) => {
        setView(true);
        setFeedback({...selectedFeedback, 
            title: title, 
            feedback: feedback
        });
    }

    const handleCloseFeedbackModal = () => {
        setView(false)
    }

    const handleFilterOffers = () => {
        if (upcoming) {
            return processed.filter((offer: OfferInterface) => offer.upcoming);
        }
        return processed;
    }

    let filteredOffers = useMemo(handleFilterOffers, [upcoming, processed]);

    return (
        <>
            {enterpriseOffers?.length ? filteredOffers.map((offer: OfferInterface) => {
                return (
                    <div className="enterprise-offer" key={offer.id} data-cy="offer">
                        {offer.category === 'Event' ?
                            <div className="offer-category">
                                <AiFillCalendar id="category" />
                                <p>Üritus</p>
                            </div>
                            :
                            <div className="offer-category">
                                <BiDrink id="category" />
                                <p>Pakkumine</p>
                            </div>
                        }
                        <div className="offer-details">
                            <div className="offer-detail-container">
                                <p>{offer.title}</p>
                            </div>
                            <div className="offer-detail-container">
                                <p>{offer.price}€</p>
                            </div>
                            <div className="offer-detail-container">
                                <img
                                    src={offer.image}
                                    alt="offer"
                                />
                            </div>
                            <div className="offer-detail-container">
                                <p>{offer.location}</p>
                            </div>
                        </div>
                        {offer.upcoming ?
                            <div className="offer-status">
                                <BiCheck
                                    id="status-open"
                                />
                                <p>Tulekul</p>
                                <MdOutlineFeedback
                                    id="offer-feedback"
                                    onClick={e => handleShowFeedbackModal(offer.feedback, offer.title)}
                                />
                            </div>
                            :
                            <div className="offer-status">
                                <AiOutlineClose
                                    id="status-closed"
                                />
                                <p>Tulekul</p>
                                <MdOutlineFeedback
                                    id="offer-feedback"
                                    onClick={e => handleShowFeedbackModal(offer.feedback, offer.title)}
                                />
                            </div>
                        }
                        <div className="offer-action">
                            <TfiTrash
                                id="offer-delete"
                                onClick={e => handleDeleteNotification(e, offer.id)}
                            />
                            <AiOutlineEdit
                                id="offer-edit"
                                onClick={e => handleEditOffer(e, offer.title)}
                            />
                        </div>
                    </div>
                );
            }) : <div className="management-offers-empty">
                    <p id="offers-empty-text" style={{color: theme ? 'white' : '#161616'}}>
                        Pakkumised on 
                        <span id="empty-text">
                            tühjad
                        </span>
                    </p>
                </div>
            }
            {viewFeedbackModal &&
                <UserFeedback
                    selectedFeedback={selectedFeedback}
                    theme={theme}
                    handleCloseFeedbackModal={handleCloseFeedbackModal}
                />
            }
        </>
    )
}

export default EnterpriseOffers;