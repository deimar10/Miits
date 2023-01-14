import React from 'react';
import './Offer.css';
import {Link} from 'react-router-dom';
import {OfferInterface} from "../../Interfaces/interface";
import {FaRegHeart} from 'react-icons/fa';

function Offer({offersData} : any ) {
    return (
        <div className="offers-grid-container">
            {offersData.length ? offersData.map((info :  OfferInterface) => {
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
                <p>
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
