import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Management.css';
import EnterpriseNav from "../../Components/EnterpriseNav/EnterpriseNav";
import EnterpriseSidebar from "../../Components/EnterpriseSidebar/EnterpriseSidebar";
import Footer from "../../Components/Footer/Footer";
import {OfferInterface} from '../../Interfaces/interface';

function Management({offersData, setOffers, theme, handleThemeSwitch, auth, setAuth}: any) {

    let { name } = useParams();

    const offers = offersData.filter((offer: OfferInterface) => offer.enterprise === name);

    const [enterpriseOffers, setEnterpriseOffers] = useState<OfferInterface[]>(offers);

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme]);

    const handleDeleteOffer = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        const removedOffer = enterpriseOffers.filter((offer: OfferInterface) => offer.id !== id);
        setEnterpriseOffers(removedOffer);

        const filterOffers = offersData.filter((offer: OfferInterface) => offer.id !== id);
        setOffers(filterOffers);
    }

    return (
        <div>
            <EnterpriseNav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            <div className="enterprise-offers-container">
                <EnterpriseSidebar theme={theme} auth={auth} setAuth={setAuth} />
                <div className="offers-container" style={{color: theme ? 'white' : 'black'}}>
                    <div className="management-header">
                        <h1>Loodud Pakkumised</h1>
                    </div>
                    <table className="offers-table">
                        <thead>
                        <tr id="tableHeadings">
                            <th>Date</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price (€)</th>
                            <th>Feedback</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {enterpriseOffers.map((offer: OfferInterface) => {
                            return (
                                <tr id="table-row" key={offer.id}>
                                    <td id="table-date">{offer.date}</td>
                                    <td>
                                        <img id="offer-image" src={offer.image} alt="offer" />
                                    </td>
                                    <td>{offer.title}</td>
                                    <td>{offer.price}</td>
                                    <div className="feedback-cell-container">
                                    {offer.feedback.map((feedback:{comment: string, name: string}, index: number) => {
                                        return (
                                            <div className="feedback-cell" key={index}>
                                                <td id="offer-feedbackName">{feedback.name}</td>
                                                <td>{feedback.comment}</td>
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <td>
                                        <div id="actions-cell">
                                            <button id="deleteBtn" onClick={ e => handleDeleteOffer(e, offer.id)}>Delete</button>
                                            <button id="editBtn">Edit</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    )
}

export default Management;
