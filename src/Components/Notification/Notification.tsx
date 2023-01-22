import React from 'react';
import './Notification.css';
import {OfferInterface} from "../../Interfaces/interface";
import {TiDelete} from "react-icons/ti";
import {BiDrink} from 'react-icons/bi';
import {AiFillCalendar} from 'react-icons/ai';

function Notification({isExpiring, theme}: any) {
    return (
        <div className="notification-container" style={{
           backgroundColor: theme ? 'rgba(73, 73, 73, 0.37)' : 'rgba(0, 0, 0, 0.6)',
            backdropFilter: theme ? 'blur(0.2rem)' : 'blur(0.3rem)',
        }}>
            <div className="notification-header">
                <h1>Aegub päeva pärast</h1>
                <div className="header-icons">
                    <BiDrink />
                    <AiFillCalendar />
                </div>
            </div>
            {typeof isExpiring !== "undefined" && isExpiring.length !== 0 ? isExpiring.map((favorite: OfferInterface) => {
                return (
                    <div className="notification-item" key={favorite.id}>
                        <div className="notification-img">
                            <img src={favorite.image} alt="offer" />
                        </div>
                        <div className="notification-details">
                            <h3>{favorite.location}</h3>
                            <h3 id="notification-title">{favorite.title}</h3>
                            <p id="notification-price">{favorite.price}€</p>
                        </div>
                    </div>
                    )
            }) : <h1 id="expiring-empty">Tundub, et sul ei ole pakkumisi, mis hakkab lähiajal lõppema.</h1>}
        </div>
    );
}

export default Notification;
