import React, {useRef} from 'react';
import dummy from "../images/dummy.png";
import Text from "./text";
import {useAuth} from "../contexts/authContext";
import {useChat} from "../contexts/messageContext";

function ChatContent({chats}) {
    const {currentUser} = useAuth();
    const {chatRoom} = useChat();

    // var getSender = chats.find((message, index)  =>{
    //     if(message.senderObj != currentUser.uid)
    //         return true;})
    return (
        <>
            <div className={`d-flex mb-3 text-container ${currentUser && currentUser.uid === chats.senderObjId ? 'user-text': 'guest-text'}`} >
                <div className='user-list-thumb-wrapper mr-4 align-self-end'>
                    <img src={chats.userProfileImageUrl} alt=""/>
                </div>
                <Text text={chats.text}/>
            </div>
            {/*<small>{timeConverter(chats.dateTime.seconds,'H-M')}</small>*/}
            <small className={`text-light `}>{chats.senderName}</small>

        </>

    );
}

export default ChatContent;