import React from 'react';
import './ActionModal.css';
import {MdClose} from 'react-icons/md';

function ActionModal({modal, handleModalClose}: any) {
    return (
        <div className="action-container" style={{backgroundColor: modal[1]}}>
            <p>{modal[0]}</p>
            <MdClose id="icon-close" onClick={handleModalClose} />
        </div>
    );
}

export default ActionModal;