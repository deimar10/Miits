import React from 'react';
import './ActionModal.css';
import '../../Responsive/components/ActionModal.css';
import {MdClose} from 'react-icons/md';

function ActionModal({modal, handleModalClose}: any) {
    return (
        <div className="action-container" style={{backgroundColor: modal[1]}}>
            <p data-cy="action-description">
                {modal[0]}
            </p>
            <MdClose 
                id="icon-close" 
                onClick={handleModalClose} 
            />
        </div>
    );
}

export default ActionModal;
