import React, {useMemo} from 'react';
import './Offer.css';
import '../../Responsive/components/Offer.css';
import {Link} from 'react-router-dom';
import {OfferInterface} from "../../Interfaces/index";
import {FaRegHeart,FaHeart} from 'react-icons/fa';
import offers from "../../pages/user/Offers";

interface Props {
    offersData: OfferInterface[],
    selected: string | undefined,
    location: string | undefined,
    theme: boolean,
    search: string | undefined,
    favorites: OfferInterface[],
    setFavorites: (favorites: any) => void,
    setOffers: (offers: any) => void
}

function Offer({offersData, selected, location, theme, search, favorites, setFavorites, setOffers}: Props) {

    const handleSortOffers = (): OfferInterface[] => {
        switch (selected) {
            case 'price':
                return offersData.sort((a: { price: number }, b: { price: number }) => a.price - b.price);
            case 'date':
                return offersData.sort((a: { date: string}, b: { date: string }) => Date.parse(a.date) - Date.parse(b.date));
            default:
                return offersData;
        }
    }

    const handleFilterOffers = (): OfferInterface[] => {
        let filteredOffers = offersData;

        switch (selected) {
            case 'events':
                filteredOffers = filteredOffers.filter((offer: { category: string }) => offer.category === 'Event');
                break;
            case 'drinks':
                filteredOffers = filteredOffers.filter((offer: { category: string }) => offer.category === 'Drinks');
                break;
        }

        if (location) {
            filteredOffers = filteredOffers.filter((offer: { location: string }) => offer.location === location);
        }

        if (search) {
            filteredOffers = filteredOffers.filter(((offer: { title: string, location: string }) =>
                offer.title.toLowerCase().includes(search.toLowerCase()) || 
                offer.location.toLowerCase().includes(search.toLowerCase())));
        }
        return filteredOffers;
    }

    const handleProccessOffers = (): OfferInterface[] => {
        let processedOffers = handleSortOffers();
        processedOffers = handleFilterOffers();

        return processedOffers;
    }

    const processed = useMemo(() => handleProccessOffers(), [location, selected, offersData, search]);

    const handleAddToFavorites = (info: OfferInterface) => {
       let offers = [...offersData];

        offers.map((offer: OfferInterface) => {
            if (offer.id === info.id) {return offer.favorite = true;}
        })

        let localFavorite = JSON.parse(localStorage.getItem('favorites') || "");
        localFavorite.push(info);

        localStorage.setItem('favorites', JSON.stringify(localFavorite));

        setOffers(offers);
        setFavorites([...favorites, info]);
    }

    return (
        <div className="offers-grid-container">
            {typeof processed !== "undefined" && processed.length !== 0 ? processed.map((info: OfferInterface) => {
                return (
                    <div className="grid-item" key={info.id}>
                        <Link to={`/offers/offer-details/${info.slug}`}>
                            <div className="grid-image" style={{
                                backgroundImage: `url(${info.image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                width: '100%',
                                borderRadius: '2rem 2rem 0rem 0rem',
                            }}>
                            </div>
                        </Link>
                        {info.upcoming ? 
                            <h3 id="upcoming">Varsti</h3> 
                            : 
                            null
                        }
                        <div className="offer-details-container">
                            <div className="offer-info">
                                <h2>{info.title}</h2>
                                <p>{info.location}</p>
                            </div>
                            <div className="offer-icon">
                                {info.favorite ? 
                                    <FaHeart 
                                        data-cy="marked" 
                                        id="fav-icon" 
                                    /> 
                                    : 
                                    <FaRegHeart 
                                        data-cy="unmarked" 
                                        id="fav-icon"
                                        onClick={e => handleAddToFavorites(info)} 
                                    />
                                }
                            </div>
                        </div>
                    </div>
                )
            }) : <div className="offers-empty">
                     <p id="offers-empty-text" style={{
                        color: theme ? 'white' : '#161616'
                    }}>
                        Paistab, et pakkumisi ei ole saadaval. Kui olete ettevõte, kes 
                        soovib reklaamida oma üritusi või pakkumisi,
                        palun registreeruge!
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
