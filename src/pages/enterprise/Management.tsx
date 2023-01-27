import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './Management.css';
import EnterpriseNav from "../../Components/EnterpriseNav/EnterpriseNav";
import EnterpriseSidebar from "../../Components/EnterpriseSidebar/EnterpriseSidebar";
import Footer from "../../Components/Footer/Footer";
import {OfferInterface} from '../../Interfaces/interface';

function Management({offersData, theme, handleThemeSwitch}: any) {

    let { name } = useParams();

    const enterpriseOffers = offersData.filter((offer: OfferInterface) => offer.enterprise === name);

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme]);

    return (
        <div>
            <EnterpriseNav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            <div className="enterprise-offers-container">
                <EnterpriseSidebar theme={theme} />
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
                                        <img id="image" src={offer.image} alt="offer" />
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
                                        <button id="deleteBtn">Delete</button>
                                        <button id="editBtn">Edit</button>
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
