import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import './Management.css';
import '../../Responsive/pages/Management.css';
import axios from "axios";
import EnterpriseNav from "../../Components/EnterpriseNav/EnterpriseNav";
import EnterpriseSidebar from "../../Components/EnterpriseSidebar/EnterpriseSidebar";
import EnterpriseOffers from "../../Components/EnterpriseOffers/EnterpriseOffers";
import ActionModal from "../../Components/ActionModal/ActionModal";
import {OfferInterface} from '../../Interfaces/interface';

interface Props {
    theme: boolean,
    handleThemeSwitch(): void,
    auth: object,
    setAuth: (auth: any) => void,
}

function Management({theme, handleThemeSwitch, auth, setAuth}: Props) {

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
        axios.delete(`http://localhost:3002/miits/api/enterprise/offer/delete/${id}`)
            .then(() => {
                let removedOffer = enterpriseOffers.filter((offer: OfferInterface) => offer.id !== id);
                setEnterpriseOffers(removedOffer);
            })
            .catch(error => {
                console.log(error);
            });

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
        <>
            <EnterpriseNav 
                theme={theme} 
                handleThemeSwitch={handleThemeSwitch} 
            />
            {viewDeleteModal.view ? 
                <ActionModal 
                    modal={settings} 
                    handleModalClose={handleModalClose} 
                /> 
                : null
            }
            <div className="enterprise-offers-container">
                <EnterpriseSidebar
                    theme={theme}
                    auth={auth}
                    setAuth={setAuth}
                />
                <div className="offers-container" style={{color: theme ? 'white' : 'black'}}>
                    <EnterpriseOffers
                        theme={theme}
                        enterpriseOffers={enterpriseOffers}
                        handleDeleteOffer={handleDeleteOffer}
                        handleEditOffer={handleEditOffer}
                    />
                </div>
            </div>
        </>
    )
}

export default Management;
