import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './EditOffer.css';
import EnterpriseNav from '../../Components/EnterpriseNav/EnterpriseNav';
import EnterpriseSidebar from "../../Components/EnterpriseSidebar/EnterpriseSidebar";
import Footer from '../../Components/Footer/Footer';
import {OfferInterface} from "../../Interfaces/interface";

interface Props {
    offersData: any,
    setOffers: (offers: any) => void,
    theme: boolean,
    handleThemeSwitch(): void,
    auth: object,
    setAuth: (auth: any) => void
}

function EditOffer({offersData, setOffers, theme, handleThemeSwitch, auth, setAuth}: Props) {

    const { title } = useParams();

    const offer = offersData.find((offer: OfferInterface) => offer.title === title);

    const [editOffer, setEditOffer] = useState<OfferInterface>({...offer});
    const [editError, setEditError] = useState<{errorMessage: string}>({
        errorMessage: ''
    });

    useEffect(() => {
        setEditOffer({...offer});
    }, [title])

    const handleOfferChange = (e:React.ChangeEvent<HTMLInputElement> | any) => {
        setEditOffer({...editOffer, [e.target.name]: e.target.valueAsNumber || e.target.value});
    }

    const validate = () => {
        let errorMessage;

        if (Object.values(editOffer).some(obj => obj === "")) {
            errorMessage = 'Palun täida pakkumise muutmisel kõik väljad';
        }

        if (errorMessage) {
            setEditError({...editError, errorMessage: errorMessage});
            return false;
        }
        return true;
    }

    const handleEditSubmit = (e:React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = validate();

        if (isValid) {
            setEditError({...editError, errorMessage: ""});

            let offers = offersData.filter((offer: OfferInterface) => offer.id !== editOffer.id);
            setOffers([...offers, editOffer]);
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme]);

    return (
        <div>
            <EnterpriseNav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            <div className="enterprise-edit-container">
                <EnterpriseSidebar theme={theme} auth={auth} setAuth={setAuth} />
                <div className="edit-offer-container" style={{color: theme ? 'white' : 'black'}}>
                    <div className="management-header">
                        <h1>Muuda pakkumist</h1>
                    </div>
                    <form onSubmit={handleEditSubmit} className="edit-form-container">
                        {editError.errorMessage ? <p id="error-validate">{editError.errorMessage}</p> : null}
                        <label>Tiitel</label>
                        <input style={{backgroundColor: theme ? '#161616' : 'white',
                            color: theme ? 'white' : 'black'}}
                            type="text"
                            name="title"
                            value={editOffer.title}
                            onChange={handleOfferChange}
                        />
                        <div className="edit-small-container">
                            <div id="edit-small-input">
                                <label>Asukoht</label>
                                <input style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                                    type="text"
                                    name="location"
                                    value={editOffer.location}
                                    onChange={handleOfferChange}
                                />
                            </div>
                            <div id="edit-small-input">
                                <label>Kuupäev (mm/dd/yy)</label>
                                <input style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                                    type="text"
                                    name="date"
                                    value={editOffer.date}
                                    onChange={handleOfferChange}
                                />
                            </div>
                            <div id="edit-small-input">
                                <label>Hind (€)</label>
                                <input style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                                    type="number"
                                    name="price"
                                    value={editOffer.price}
                                    onChange={handleOfferChange}
                                />
                            </div>
                        </div>
                        <label>Kirjeldus</label>
                        <textarea style={{backgroundColor: theme ? '#161616' : 'white',
                            color: theme ? 'white' : 'black'}}
                            name="description"
                            value={editOffer.description}
                            onChange={handleOfferChange}
                        />
                        <label>Kategooria</label>
                        <select style={{backgroundColor: theme ? '#161616' : 'white',
                            color: theme ? 'white' : 'black'}}
                            name="category"
                            className="w-full p-2 rounded-md bg-slate-800 border border-gray-700 text-white mt-4 bg-blend-color-dodge"
                            value={editOffer.category}
                            onChange={handleOfferChange}
                        >
                            <option value="Event">Event</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                        <div className="form-submit-container">
                            <button type="submit">Muuda</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    );
}

export default EditOffer;
