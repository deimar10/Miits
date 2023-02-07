import React from 'react';
import './FeedbackSuccess.css';
import '../../Responsive/components/FeedbackSuccess.css';
import {BiMessageCheck} from 'react-icons/bi';

function FeedbackSuccess() {
    return (
        <div>
            <BiMessageCheck id="feedback-success-notification" />
        </div>
    );
}

export default FeedbackSuccess;