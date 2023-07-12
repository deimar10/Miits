import React, {useState, useEffect} from 'react';
import './Panel.css';
import {registered} from '../../Interfaces';
import {IoBusinessOutline} from 'react-icons/io5';
import {getRegisteredEnterprises} from '../../middleware/api';

interface Props {
    admin: boolean
}

function Panel({admin}: Props) {

    const [registered, setRegistered] = useState<registered[]>([]);

    useEffect(() => {
        handleGetRegistered();
    }, [])

    const handleGetRegistered = async () => {
        try {
            const registered = await getRegisteredEnterprises();
            setRegistered(registered);
        } catch (error) {
            console.log('Error requesting registered enterprises:', error);
            throw error;
        }
    }

    return (
        <div className="registered-container">
            <div className="registered-enterprise-count">
                Registreeritud Ettevõtted: {registered.length}
            </div>
            <div className="tab-container">
                {registered.map((enterprise: registered) => {
                    return (
                        <div className="registered-tab" data-cy="registered" key={enterprise.id}>
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
        </div>
    );
}

export default Panel;