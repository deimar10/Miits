import React from 'react';
import './FeedbackSuccess.css';
import '../../Responsive/components/FeedbackSuccess.css';
import {BiMessageCheck} from 'react-icons/bi';

function FeedbackSuccess() {
    return (
        <>
            <BiMessageCheck id="feedback-success-notification" />
        </>
    );
}

export default FeedbackSuccess;