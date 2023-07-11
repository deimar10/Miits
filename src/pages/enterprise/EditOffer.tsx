import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './EditOffer.css';
import '../../Responsive/pages/EditOffer.css';
import axios from 'axios';
import {TextField, MenuItem} from '@mui/material';
import EnterpriseNav from '../../Components/EnterpriseNav/EnterpriseNav';
import EnterpriseSidebar from "../../Components/EnterpriseSidebar/EnterpriseSidebar";
import {FieldInputProps, FieldLabelProps, FieldVariant} from '../../utils';
import {DateField} from '../../Components/DateField';
import ActionModal from '../../Components/ActionModal/ActionModal';
import {OfferInterface} from "../../Interfaces";
import {BiCheckCircle} from 'react-icons/bi';
import {getSingleOfferDetails} from '../../middleware/api';

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
    const [viewEditModal, setViewEditModal] = useState({
        view: false,
        offer: 0
    });
    
    const singleOfferUrl = `${process.env.REACT_APP_GET_OFFER_DETAILS}/${title}`;
    const editOfferUrl = `${process.env.REACT_APP_EDIT_OFFER}/${editOffer.id}`;

    useEffect(() => {
        handleGetSingleOffer();
    }, [])

    const handleGetSingleOffer = async () => {
        try {
            const offerDetails = await getSingleOfferDetails(singleOfferUrl);
            setEditOffer(offerDetails);
        } catch (error) {
            console.log('Error requesting offer-details:', error);
            throw error;
        }
    }

    const handleOfferChange = (e:React.ChangeEvent<HTMLInputElement> | any) => {
        setEditOffer({...editOffer, [e.target.name]: e.target.valueAsNumber || e.target.value});
    }

    const handleEditSubmit = (e:React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.put(editOfferUrl, {
            title: editOffer.title,
            category: editOffer.category,
            location: editOffer.location,
            date: editOffer.date,
            price: editOffer.price,
            description: editOffer.description
        })
            .then(() => {
                setViewEditModal({...viewEditModal, view: true, offer: editOffer.id});
            })
            .catch(error => {
                console.log(error);
            });
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
                                value={editOffer.category || ""}
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
