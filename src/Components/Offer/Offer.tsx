import React, {useMemo} from 'react';
import './Offer.css';
import {Link} from 'react-router-dom';
import {OfferInterface} from "../../Interfaces/interface";
import {FaRegHeart} from 'react-icons/fa';

function Offer({offersData, selected, location, theme, search, favorites, setFavorites} : any ) {

    const handleSortOffers = () => {
        switch (selected) {
            case 'price':
                return offersData.sort((a: { price: number }, b: { price: number }) => a.price - b.price);
            case 'date':
                return offersData.sort((a: { date: string}, b: { date: string }) => Date.parse(a.date) - Date.parse(b.date));
            default:
                return offersData;
        }
    }

    const handleFilterOffers = () => {
        let filteredOffers = offersData;

        switch (selected) {
            case 'events':
                filteredOffers = filteredOffers.filter((offer: { category: string }) => offer.category === 'Event');
                break;
            case 'drinks':
                filteredOffers = filteredOffers.filter((offer: { category: string }) => offer.category === 'Drinks');
                break;
        }

        switch (location) {
            case 'Tartu':
                filteredOffers = filteredOffers.filter((offer: { location: string }) => offer.location === 'Tartu');
                break;
            case 'Tallinn':
                filteredOffers = filteredOffers.filter((offer: { location: string }) => offer.location === 'Tallinn');
                break;
            case 'Pärnu':
                filteredOffers = filteredOffers.filter((offer: { location: string }) => offer.location === 'Pärnu');
                break;
        }

        if (search) {
            filteredOffers = filteredOffers.filter(((offer: { title: string, location: string }) =>
                offer.title.toLowerCase().includes(search.toLowerCase()) || offer.location.toLowerCase().includes(search.toLowerCase())));
        }
        return filteredOffers;
    }

    const handleProccessOffers = () => {
        let processedOffers = handleSortOffers();
        processedOffers = handleFilterOffers();

        return processedOffers;
    }

    const processed = useMemo(() => handleProccessOffers(), [location, selected, offersData, search]);

    const handleAddToFavorites = (info: OfferInterface) => {
        setFavorites([...favorites, info]);
    }

    return (
        <div className="offers-grid-container">
            {typeof processed !== "undefined" && processed.length !== 0 ? processed.map((info: OfferInterface) => {
                return (
                    <div className="grid-item" key={info.id}>
                        <div className="grid-image" style={{
                            backgroundImage: `url(${info.image})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            width: '100%',
                            borderRadius: '2rem 2rem 0rem 0rem',
                        }}>
                        </div>
                        {info.upcoming ? <h3 id="upcoming" >Upcoming!</h3> : null}
                        <div className="offer-details-container">
                            <div className="offer-info">
                                <h2>{info.title}</h2>
                                <p>
                                    {info.location}
                                </p>
                            </div>
                            <div className="offer-icon">
                                <FaRegHeart id="fav-icon" onClick={e => handleAddToFavorites(info)} />
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
