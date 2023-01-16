import React, {useMemo} from 'react';
import './Offer.css';
import {Link} from 'react-router-dom';
import {OfferInterface} from "../../Interfaces/interface";
import {FaRegHeart} from 'react-icons/fa';

function Offer({offersData, selected, location, theme, search} : any ) {

    const handleProccessOffers = (): [] => {
        if (selected === 'price') { return offersData.sort((a: { price: number }, b: { price: number }) => a.price - b.price);}

        if (selected === 'date') { return offersData.sort((a: { date: string }, b: { date: string }) => Date.parse(a.date) - Date.parse(b.date));}

        if (selected === 'events') { return offersData.filter((offer: { category: string }) => offer.category === 'Event');}

        if (selected === 'drinks') { return offersData.filter((offer: { category: string }) => offer.category === 'Drinks');}

        if (location === 'Tartu') { return offersData.filter((offer: { location: string }) => offer.location === 'Tartu');}

        if (location === 'Tallinn') { return offersData.filter((offer: { location: string }) => offer.location === 'Tallinn');}

        if (location === 'Pärnu') { return offersData.filter((offer: { location: string }) => offer.location === 'Pärnu');}

        if (search) { return offersData.filter((offer: { title: string, location: string }) => offer.title.includes(search) || offer.location.includes(search));}

        return offersData;
    }

    let processed = useMemo(handleProccessOffers, [location, selected, offersData, search]);

    return (
        <div className="offers-grid-container">
            {typeof processed !== "undefined" && processed.length !== 0 ? processed.map((info :  OfferInterface) => {
                return (
                    <div className="grid-item" key={info.id}>
                        <div className="grid-image" style={{
                            backgroundImage: `url(${info.image})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            width: '100%',
                            borderRadius: '2rem 2rem 0rem 0rem'
                        }}>
                        </div>
                        <div className="offer-details-container">
                            <div className="offer-info">
                                <h2>{info.title}</h2>
                                <p>
                                    {info.location}
                                </p>
                            </div>
                            <div className="offer-icon">
                                <FaRegHeart id="fav-icon" />
                            </div>
                        </div>
                    </div>
                )
            }) : <div className="offers-empty">
                <p style={{
                    color: theme ? 'white' : '#161616'
                }}>
                    Looks like there aren't any offers available. If you are an enterprise that would like to advertise their events or deals,
                    please sign up!
                </p>
                <Link to={"/enterprise/register"} id="redirect">
                    Register Account
                </Link>
            </div>
            }
        </div>
    );
}

export default Offer;
