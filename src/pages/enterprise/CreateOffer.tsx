import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './CreateOffer.css';
import '../../Responsive/pages/CreateOffer.css';
import axios from 'axios';
import EnterpriseNav from '../../Components/EnterpriseNav/EnterpriseNav';
import EnterpriseSidebar from '../../Components/EnterpriseSidebar/EnterpriseSidebar';
import Footer from '../../Components/Footer/Footer';
import ActionModal from '../../Components/ActionModal/ActionModal';

interface Props {
    theme: boolean,
    auth: object,
    setAuth: (auth: any) => void,
    handleThemeSwitch(): void,
}

function CreateOffer({theme, auth, setAuth, handleThemeSwitch}: Props) {

    let location = useLocation();

    const [createError, setCreateError] = useState<{errorMessage: string}>({
        errorMessage: ''
    });
    const [createOffer, setCreateOffer] = useState({
        upcoming: false,
        favorite: false,
        enterprise: location.state,
        title: "",
        category: "",
        location: "",
        date: "",
        price: 0,
        image: "",
        description: "",
    });
    const [viewCreateModal, setViewCreateModal] = useState({
        view: false,
        offer: 0
    });

    const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        setCreateOffer({...createOffer, [e.target.name]: e.target.value});
    }

    const handleImageUploadChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const file = e.target.files[0];
        const imgPath = `/assets/Images/offers/${file.name}`;

        setCreateOffer({...createOffer, image: imgPath});
    }

    const validate = () => {
        let errorMessage;

        if (Object.values(createOffer).some(obj => obj === "")) {
            errorMessage = 'Palun täida pakkumise loomisel kõik väljad';
        }

        if (errorMessage) {
            setCreateError({...createError, errorMessage: errorMessage});
            return false;
        }
        return true;
    }

    const handleCreateSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = validate();

        if (isValid) {
            axios.post('http://localhost:3002/miits/api/enterprise/offer/create', {
                upcoming: createOffer.upcoming,
                favorite: createOffer.favorite,
                enterprise: createOffer.enterprise,
                title: createOffer.title,
                category: createOffer.category,
                location: createOffer.location,
                date: createOffer.date,
                price: createOffer.price,
                image: createOffer.image,
                description: createOffer.description
            })
                .then((response) => {
                    setCreateError({...createError, errorMessage: ''});
                    setViewCreateModal({...viewCreateModal, view: true, offer: response.data.id});
                })
                .catch(error => {
                   console.log(error);
                });
        }
    }

    const handleModalClose = () => {
        setViewCreateModal({...viewCreateModal, view: false, offer: 0});
    }

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme]);

    const settings = [`Pakkumine (${viewCreateModal.offer}) edukalt loodud`, '#5EFFB1'];

    return (
        <div>
            <EnterpriseNav theme={theme} handleThemeSwitch={handleThemeSwitch} />
            {viewCreateModal.view ? <ActionModal modal={settings} handleModalClose={handleModalClose} /> : null}
            <div className="enterprise-create-container">
                <EnterpriseSidebar theme={theme} auth={auth} setAuth={setAuth} />
                <div className="create-offer-container" style={{color: theme ? 'white' : 'black'}}>
                    <div className="management-header">
                        <h1>Loo pakkumine</h1>
                    </div>
                    <form onSubmit={handleCreateSubmit} className="create-form-container">
                        {createError.errorMessage ? <p id="error-validate">{createError.errorMessage}</p> : null}
                        <label>Tiitel</label>
                        <input style={{backgroundColor: theme ? '#161616' : 'white',
                            color: theme ? 'white' : 'black'}}
                               type="text"
                               name="title"
                               placeholder="e.g Shooters"
                               onChange={handleOfferChange}
                        />
                        <div className="create-small-container">
                            <div id="create-small-input">
                                <label>Asukoht</label>
                                <input style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                                       type="text"
                                       name="location"
                                       placeholder="e.g Tartu"
                                       onChange={handleOfferChange}
                                />
                            </div>
                            <div id="create-small-input">
                                <label>Kuupäev (mm/dd/yy)</label>
                                <input style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                                       type="text"
                                       name="date"
                                       placeholder="02.01.2023"
                                       onChange={handleOfferChange}
                                />
                            </div>
                            <div id="create-small-input">
                                <label>Hind (€)</label>
                                <input style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                                       type="number"
                                       step="0.01"
                                       name="price"
                                       placeholder="e.g 4.99"
                                       onChange={handleOfferChange}
                                />
                            </div>
                        </div>
                        <label>Kirjeldus</label>
                        <textarea style={{backgroundColor: theme ? '#161616' : 'white',
                            color: theme ? 'white' : 'black'}}
                                  name="description"
                                  placeholder="e.g Vägev üritus!"
                                  onChange={handleOfferChange}
                        />
                        <div className="create-container">
                            <div className="create-select-input">
                                <label>Kategooria</label>
                                <select id="select" style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                                        name="category"
                                        className="w-full p-2 rounded-md bg-slate-800 border border-gray-700 text-white mt-4 bg-blend-color-dodge"
                                        onChange={handleOfferChange}
                                >
                                    <option value="Event">Event</option>
                                    <option value="Drinks">Drinks</option>
                                </select>
                            </div>
                            <div className="create-file-input">
                                <label>Pilt</label>
                                <input style={{backgroundColor: theme ? '#161616' : 'white',
                                    color: theme ? 'white' : 'black'}}
                                    type="file"
                                    onChange={handleImageUploadChange}
                                />
                            </div>
                        </div>
                        <div className="form-submit-container">
                            <button type="submit">Loo pakkumine</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    );
}

export default CreateOffer;
