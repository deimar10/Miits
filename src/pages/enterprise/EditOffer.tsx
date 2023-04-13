import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './EditOffer.css';
import '../../Responsive/pages/EditOffer.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import EnterpriseNav from '../../Components/EnterpriseNav/EnterpriseNav';
import EnterpriseSidebar from "../../Components/EnterpriseSidebar/EnterpriseSidebar";
import {FieldInputProps} from '../../utils/index';
import {FieldLabelProps} from '../../utils/index';
import {FieldVariant} from '../../utils/index';
import {DateField} from '../../Components/DateField';
import ActionModal from '../../Components/ActionModal/ActionModal';
import {OfferInterface} from "../../Interfaces/index";
import {BiCheckCircle} from 'react-icons/bi';

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

    const variant = FieldVariant(theme);

    const inputProps = FieldInputProps(theme);
    const labelProps = FieldLabelProps(theme);
    
    return (
        <>
            <EnterpriseNav 
                theme={theme} 
                handleThemeSwitch={handleThemeSwitch}
            />
            {viewEditModal.view &&
                <ActionModal 
                    modal={settings} 
                    handleModalClose={handleModalClose}
                    open={viewEditModal}
                />
            }
            <div className="enterprise-edit-container">
                <EnterpriseSidebar 
                    theme={theme} 
                    auth={auth} 
                    setAuth={setAuth}
                />
                <div className="edit-offer-container">
                    <form onSubmit={handleEditSubmit}>
                        {editError.errorMessage &&
                            <p id="error-validate">
                                {editError.errorMessage}
                            </p>
                        }
                        <div className="edit-input-container">
                            <TextField
                                name="title"
                                label="Tiitel"
                                required={true}
                                value={editOffer.title}
                                variant={variant}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="location"
                                label="Asukoht"
                                required={true}
                                value={editOffer.location}
                                variant={variant}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="description"
                                label="Kirjeldus"
                                required={true}
                                value={editOffer.description}
                                multiline
                                variant={variant}
                                maxRows={4}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <DateField
                                name="date"
                                label="Kuupäev"
                                variant={variant}
                                value={editOffer.date}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="price"
                                label="Hind(€)"
                                required={true}
                                variant={variant}
                                value={editOffer.price}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="category"
                                label="Kategooria"
                                required={true}
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
                                <BiCheckCircle id="check" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditOffer;
