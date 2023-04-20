import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './CreateOffer.css';
import '../../Responsive/pages/CreateOffer.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/CircularProgress';
import EnterpriseNav from '../../Components/EnterpriseNav/EnterpriseNav';
import EnterpriseSidebar from '../../Components/EnterpriseSidebar/EnterpriseSidebar';
import {FieldInputProps} from '../../utils/index';
import {FieldLabelProps} from '../../utils/index';
import {FieldVariant} from '../../utils/index';
import {DateField} from '../../Components/DateField';
import ActionModal from '../../Components/ActionModal/ActionModal';
import {BiCheckCircle} from 'react-icons/bi';

interface Props {
    theme: boolean,
    auth: object,
    setAuth: (auth: any) => void,
    handleThemeSwitch(): void,
}

function CreateOffer({theme, auth, setAuth, handleThemeSwitch}: Props) {

    let location = useLocation();

    const [file, setFile] = useState<any>("");
    const [loading, setLoading] = useState<number>(0);
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
        setFile(e.target.files[0]);
    }
    
    useEffect(() => {
        if (file) {
            handleFileUpload();
        }
    }, [file])

    const handleFileUpload = () => {
        const storageRef = ref(storage, `/files/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setLoading(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                     setCreateOffer({...createOffer, image: url});
                });
            }
        );
    };

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
                    setCreateError({...createError,
                        errorMessage: ''
                    });
                    setViewCreateModal({...viewCreateModal,
                        view: true,
                        offer: response.data.id
                    });
                })
                .catch(error => {
                    console.log(error);
                });

            setCreateOffer({...createOffer, title: "", category: "",
                location: "",
                date: "",
                price: 0,
                description: ""
            });
        }   
    }

    const handleModalClose = () => {
        setViewCreateModal({...viewCreateModal, view: false, offer: 0});
    }

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme]);

    const settings = [`Pakkumine (${viewCreateModal.offer}) edukalt loodud`, 'success'];

    const variant = FieldVariant(theme);
    
    const inputProps = FieldInputProps(theme);
    const labelProps = FieldLabelProps(theme);

    return (
        <>
            <EnterpriseNav
                theme={theme}
                handleThemeSwitch={handleThemeSwitch}
            />
            {viewCreateModal.view &&
                <ActionModal
                    modal={settings}
                    handleModalClose={handleModalClose}
                    open={viewCreateModal}
                />
            }
            <div className="enterprise-create-container">
                <EnterpriseSidebar
                    theme={theme}
                    auth={auth}
                    setAuth={setAuth}
                    created={viewCreateModal.view}
                />
                <div className="create-offer-container">
                    <form onSubmit={handleCreateSubmit}>
                        {createError.errorMessage &&
                            <p id="error-validate">
                                {createError.errorMessage}
                            </p>
                        }
                        <div className="create-input-container">
                            <TextField
                                name="title"
                                label="Tiitel"
                                required={true}
                                variant={variant}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                value={createOffer.title}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="location"
                                label="Asukoht"
                                required={true}
                                variant={variant}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                value={createOffer.location}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="description"
                                label="Kirjeldus"
                                required={true}
                                multiline
                                maxRows={4}
                                variant={variant}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                value={createOffer.description}
                                onChange={handleOfferChange}
                            />
                            <DateField
                                name="date"
                                label="Kuupäev"
                                variant={variant}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                value={createOffer.date}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="price"
                                label="Hind(€)"
                                required={true}
                                variant={variant}
                                InputLabelProps={labelProps}
                                InputProps={inputProps}
                                value={createOffer.price}
                                onChange={handleOfferChange}
                            />
                            <TextField
                                name="category"
                                label="Kategooria"
                                data-cy="category"
                                required={true}
                                select
                                variant={variant}
                                value={createOffer.category}
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
                            <>
                                <TextField
                                    name="image"
                                    type="file"
                                    data-cy="image"
                                    variant={variant}
                                    InputLabelProps={labelProps}
                                    InputProps={inputProps}
                                    onChange={handleImageUploadChange}
                                />
                                {loading !== 100 && file &&
                                    <LinearProgress
                                        value={loading}
                                    />
                                }
                            </>
                        </div>
                        <div className="create-submit-container">
                            <button id="create-submit" type="submit">
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

export default CreateOffer;
