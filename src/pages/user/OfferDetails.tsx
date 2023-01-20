import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './OfferDetails.css';
import {OfferInterface} from "../../Interfaces/interface";

function OfferDetails ({offersData}: any) {

    let { slug } = useParams();

    const offer = offersData.find((offer: OfferInterface) => offer.slug === slug);

    const [offerSelected, setOfferSelected] = useState<OfferInterface>({...offer});

    useEffect(() => {
        setOfferSelected({...offer});
    }, [slug])

    return (
        <div>

        </div>
    );
}

export default OfferDetails;
