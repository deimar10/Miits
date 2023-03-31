import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './EditOffer.css';
import '../../Responsive/pages/EditOffer.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import EnterpriseNav from '../../Components/EnterpriseNav/EnterpriseNav';
import EnterpriseSidebar from "../../Components/EnterpriseSidebar/EnterpriseSidebar";
import Footer from '../../Components/Footer/Footer';
import ActionModal from '../../Components/ActionModal/ActionModal';
import {OfferInterface} from "../../Interfaces/index";

interface Props {
    offersData: any,
    theme: boolean,
    handleThemeSwitch(): void,
    auth: object,
    setAuth: (auth: any) => void
}

function EditOffer({offersData, theme, handleThemeSwitch, auth, setAuth}: Props) {

    const { title } = useParams();

    const offer = offersData.find((offer: OfferInterface) => offer.title === title);

    const [editOffer, setEditOffer] = useState<OfferInterface>({...offer});
    const [editError, setEditError] = useState<{errorMessage: string}>({
        errorMessage: ''
    });
    const [viewEditModal, setViewEditModal] = useState({
        view: false,
        offer: 0
    })

    useEffect(() => {
        handleGetSingleOffer();
    }, [])

    const handleGetSingleOffer = () => {
        axios.get(`http://localhost:3002/miits/api/user/offers/offer-details/${title}`)
            .then(response => {
                setEditOffer(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

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
            axios.put(`http://localhost:3002/miits/api/enterprise/offer/edit/${editOffer.id}`, {
                title: editOffer.title,
                category: editOffer.category,
                location: editOffer.location,
                date: editOffer.date,
                price: editOffer.price,
                description: editOffer.description
            })
                .then(() => {
                    setViewEditModal({...viewEditModal, view: true, offer: editOffer.id});
                    setEditError({...editError, errorMessage: ""});
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const handleModalClose = () => {
        setViewEditModal({...viewEditModal, view: false, offer: 0});
    }

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme]);

    const settings = [`Pakkumine (${viewEditModal.offer}) edukalt muudetud`, 'info'];

    const variant = theme ? 'outlined' : 'standard';

    const inputProps = {
        style: {
            color: theme ? 'white' : 'initial',
            width: '95%',
            border: `1px solid ${theme ? 'white' : null}`,
            borderRadius: '4px',
        },
    };

    const labelProps = {
        style: {
            color: theme ? '#5EFFB1' : 'initial',
            shrink: true
        },
    };

    return (
        <>
            <EnterpriseNav 
                theme={theme} 
                handleThemeSwitch={handleThemeSwitch}
            />
            {viewEditModal.view ? 
                <ActionModal 
                    modal={settings} 
                    handleModalClose={handleModalClose}
                    open={viewEditModal}
                /> 
                : null
            }
            <div className="enterprise-edit-container">
                <EnterpriseSidebar 
                    theme={theme} 
                    auth={auth} 
                    setAuth={setAuth}
                />
                <div className="edit-offer-container">
                    <form onSubmit={handleEditSubmit}>
                        {editError.errorMessage ?
                            <p id="error-validate">
                                {editError.errorMessage}
                            </p>
                            :
                            null
                        }
                        <div className="edit-input-container">
                            <TextField
                                name="title"
                                label="Tiitel"
                                value={editOffer.title}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="location"
                                label="Asukoht"
                                value={editOffer.location}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="description"
                                label="Kirjeldus"
                                value={editOffer.description}
                                multiline
                                maxRows={4}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="date"
                                label="Kuupäev"
                                value={editOffer.date}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="price"
                                label="Hind(€)"
                                value={editOffer.price}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="category"
                                label="Kategooria"
                                select
                                variant={variant}
                                value={editOffer.category}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            >
                                <MenuItem value="Event">
                                    Event
                                </MenuItem>
                                <MenuItem value="Drinks">
                                    Drinks
                                </MenuItem>
                            </TextField>
                        </div>
                        <div className="edit-submit-container">
                            <button id="edit-submit" type="submit">
                                Salvesta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditOffer;
