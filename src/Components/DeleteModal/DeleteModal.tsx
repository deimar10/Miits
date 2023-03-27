import React from 'react';
import './DeleteModal.css';
import '../../Responsive/components/DeleteModal.css';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface Props {
    theme: boolean,
    handleDeleteOffer(e: any, id: number): void,
    handleCloseNotification(): void,
    offerSelected: {id: number}
}

function DeleteModal({theme, handleDeleteOffer, handleCloseNotification, offerSelected}: Props) {
    return (
        <div className="delete-notification-container" style={{background: theme ? '#212121' : 'white'}}>
            <div className="modal-close-container">
                <IoCloseCircleOutline
                    id="modal-close"
                    onClick={handleCloseNotification}
                />
            </div>
            <div className="delete-warning">
                <p>
                    Oled kindel, et soovid seda pakkumist <span id="bold">kustutada?</span> 
                    Kustutatud pakkumiste andmeid tagasi ei saa.
                </p>
            </div>
            <div className="confirm-delete">
                <button id="delete-submit" onClick={e => handleDeleteOffer(e, offerSelected.id)}>
                    Kustuta
                </button>
            </div>
        </div>
    )
}

export default DeleteModal;