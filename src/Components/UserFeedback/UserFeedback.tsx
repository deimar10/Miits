import React from 'react';
import './UserFeedback.css';
import '../../Responsive/components/UserFeedback.css';
import {IoCloseCircleOutline} from 'react-icons/io5';

interface Props {
    selectedFeedback: any,
    theme: boolean,
    handleCloseFeedbackModal(): void
}

function UserFeedback({selectedFeedback, theme, handleCloseFeedbackModal}: Props) {
    return (
        <div className="feedback-container" style={{background: theme ? '#212121' : 'white'}}>
            <div className="offer-title">
                <h1>{selectedFeedback.title} Tagasiside</h1>
                <IoCloseCircleOutline
                    id="feedback-close"
                    onClick={handleCloseFeedbackModal}
                />
            </div>
            <div className="offer-feedback-container">
                {selectedFeedback?.feedback.length ? selectedFeedback.feedback.map((feedback: any) => {
                    return (
                        <div className="offer-feedback" key={feedback.comment}>
                            <p id="feedback-name">
                                {feedback.name}
                            </p>
                            <p id="feedback-comment">
                                {feedback.comment}
                            </p>
                        </div>
                    )
                }) :
                    <div className="feedback-empty-container">
                        <h1> Paistab, et pakkumisel ei ole ühtegi tagassisidet</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserFeedback;