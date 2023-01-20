import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './OfferDetails.css';
import {OfferInterface} from "../../Interfaces/interface";
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';

function OfferDetails ({offersData, theme, handleThemeSwitch, favoriteCount}: any) {

    let { slug } = useParams();

    const offer = offersData.find((offer: OfferInterface) => offer.slug === slug);

    const [offerSelected, setOfferSelected] = useState<OfferInterface>({...offer});

    useEffect(() => {
        setOfferSelected({...offer});
    }, [slug])

    useEffect(() => {
        document.body.style.backgroundColor = theme ? '#161616' : 'white';
    }, [theme])

    return (
        <div>
            <Nav theme={theme} handleThemeSwitch={handleThemeSwitch} favoriteCount={favoriteCount} />
            <Footer theme={theme} />
        </div>
    );
}

export default OfferDetails;
