import React, {useState} from 'react';
import '../sections/message/message.css'
import moment from "moment";



const Text = ({message, preview}) => {

        return (
            <div className='chat-text-container  d-flex align-items-end flex-column'>
                <span className={`align-self-start font-weight-bold`}> {message.senderName}</span>
                <span className={`align-self-start text-break`}> {message.text}</span>
                <small className={`text-light`}>{moment(message.dateTime?.seconds * 1000).format("DD/MM/YYYY h:mm")}</small>



            </div>


        );
    }
;

export default Text;