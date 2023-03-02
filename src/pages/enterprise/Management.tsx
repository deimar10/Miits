import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import './Management.css';
import '../../Responsive/pages/Management.css';
import axios from "axios";
import EnterpriseNav from "../../Components/EnterpriseNav/EnterpriseNav";
import EnterpriseSidebar from "../../Components/EnterpriseSidebar/EnterpriseSidebar";
import Footer from "../../Components/Footer/Footer";
import ActionModal from "../../Components/ActionModal/ActionModal";
import {OfferInterface} from '../../Interfaces/interface';
import {FaTrash} from 'react-icons/fa';
import {MdEdit} from 'react-icons/md';

interface Props {
    offersData: any,
    setOffers: (offers: any) => void,
    theme: boolean,
    handleThemeSwitch(): void,
    auth: object,
    setAuth: (auth: any) => void,
}

function Management({offersData, setOffers, theme, handleThemeSwitch, auth, setAuth}: Props) {

    let { name } = useParams();
    let { state } = useLocation();
    let navigate = useNavigate();

    const [enterpriseOffers, setEnterpriseOffers] = useState<OfferInterface[]>([]);
    const [viewDeleteModal, setViewDeleteModal] = useState({
        view: false,
        offer: 0,
    });

    useEffect(() => {
        handleGetEnterpriseOffers();
    }, []);

    const handleGetEnterpriseOffers = () => {
      axios.get(`http://localhost:3002/miits/api/enterprise/offers/?enterprise=${name}`)
          .then(response => {
              setEnterpriseOffers(response.data);
          })
          .catch(error => {
              console.log(error);
          });
    };

    const handleDeleteOffer = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        const removedOffer = enterpriseOffers.filter((offer: OfferInterface) => offer.id !== id);
        setEnterpriseOffers(removedOffer);

        const filterOffers = offersData.filter((offer: OfferInterface) => offer.id !== id);
        setOffers(filterOffers);

        setViewDeleteModal({...viewDeleteModal, view: true, offer: id});
    }

    const handleEditOffer = (e: React.MouseEvent<HTMLButtonElement>, title: string) => {
        navigate(`/enterprise/edit/${title}`, {state: state});
    }

    const handleModalClose = () => {
        setViewDeleteModal({...viewDeleteModal, view: false, offer: 0});
    }

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme]);

    const settings = [`Pakkumine (${viewDeleteModal.offer}) edukalt eemaldatud`, '#DC5757'];

    return (
        <div>
            <EnterpriseNav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            {viewDeleteModal.view ? <ActionModal modal={settings} handleModalClose={handleModalClose} /> : null}
            <div className="enterprise-offers-container">
                <EnterpriseSidebar theme={theme} auth={auth} setAuth={setAuth} />
                <div className="offers-container" style={{color: theme ? 'white' : 'black'}}>
                    <div className="management-header">
                        <h1>Loodud Pakkumised</h1>
                    </div>
                    <table className="offers-table">
                        <thead>
                        <tr id="tableHeadings">
                            <th>Kuupäev</th>
                            <th>Pilt</th>
                            <th>Tiitel</th>
                            <th>Hind (€)</th>
                            <th>Tagasiside</th>
                            <th>Toimingud</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {enterpriseOffers.length !== 0 ? enterpriseOffers.map((offer: OfferInterface) => {
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
                                            <button id="deleteBtn" onClick={e => handleDeleteOffer(e, offer.id)}>
                                                <FaTrash id="delete-icon" />
                                                Eemalda
                                            </button>
                                            <button id="editBtn" onClick={e => handleEditOffer(e, offer.title)}>
                                                <MdEdit id="edit-icon" />
                                                Muuda
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }) : <div className="management-offers-empty">
                                <p id="offers-empty-text" style={{
                                    color: theme ? 'white' : '#161616'
                                }}>
                                    Paistab, et ühtegi pakkumist ei ole loodud.
                                </p>
                            </div>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    )
}

export default Management;
