import React, {useEffect, useState} from 'react';
import './Notification.css';
import {OfferInterface} from "../../Interfaces/interface";
import {IoMdClose} from "react-icons/io";
import {BiDrink} from 'react-icons/bi';
import {AiFillCalendar} from 'react-icons/ai';

function Notification() {

    const [isExpiring, setExpiring] = useState<OfferInterface[]>();

    useEffect(() => {
        let localFavorites = JSON.parse(localStorage.getItem('favorites') || "");

        const filteredFavorites = localFavorites.filter((favorite: any) => {
            let favoriteDate = new Date(favorite.date);
            let futureDate = new Date();

            futureDate.setDate(futureDate.getDate() + 1);
            return favoriteDate.toLocaleDateString() === futureDate.toLocaleDateString();
        });
        setExpiring(filteredFavorites);
    }, [])

    return (
        <div className="notification-container">
            <div className="notification-header">
                <h1>Kehtivus - 1 päev</h1>
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
                            <IoMdClose id="close-icon" />
                        </div>
                    </div>
                    )
            }) : <h1 id="expiring-empty">Tundub, et sul ei ole pakkumisi, mis hakkab lähiajal lõppema.</h1>}
        </div>
    );
}

export default Notification;