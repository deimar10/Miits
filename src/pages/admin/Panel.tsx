import React, {useState, useEffect} from 'react';
import './Panel.css';
import axios from 'axios';
import {registered} from '../../Interfaces/index';
import {IoBusinessOutline} from 'react-icons/io5';

function Panel() {

    const [registered, setRegistered] = useState<registered[]>([]);

    useEffect(() => {
        handleGetRegistered();
    }, [])

    const handleGetRegistered = () => {
        axios.get('http://localhost:3002/miits/api/enterprise/registered')
            .then(response => {
                setRegistered(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="registered-container">
            <div className="registered-enterprise-count">
                Registreeritud Ettevõtted: {registered.length}
            </div>
            {registered.map((enterprise: registered) => {
                return (
                    <div className="registered-tab" key={enterprise.id}>
                        <div className="registered-icon">
                            <IoBusinessOutline />
                        </div>
                        <div className="registered-details">
                            <p id="registered-name">
                                {enterprise.name}
                            </p>
                            <p id="registered-date">
                                Liitus: <span id="date">{enterprise.joined_at}</span>
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Panel;