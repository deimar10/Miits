import React from 'react';
import './Offers.css';
import {FaRegHeart, FaWallet} from 'react-icons/fa';
import {AiFillCalendar} from 'react-icons/ai';
import {BiDrink} from 'react-icons/bi';
import {ImLocation2} from 'react-icons/im';
import {HiClock} from 'react-icons/hi';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';

function Offers() {
    return (
        <div>
            <Nav/>
            <div className="offers-section">
                <div className="headings">
                    <BiDrink id="heading-icons"/>
                    <h2>Pakkumised</h2>
                    <AiFillCalendar id="heading-icons" />
                    <h2>Üritused</h2>
                </div>
                <div className="grid-wrapper">
                    <div className="sideBar-container">
                        <div className="sideBar">
                            <ImLocation2 id="sideBar-icons" />
                            <AiFillCalendar id="sideBar-icons" />
                            <BiDrink id="sideBar-icons" />
                            <FaWallet id="sideBar-icons" />
                            <HiClock id="sideBar-icons" />
                        </div>
                    </div>
                    <div className="offers-grid-container">

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Offers;
