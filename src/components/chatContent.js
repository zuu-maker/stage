import React, {useRef} from 'react';
import dummy from "../images/dummy.png";
import Text from "./text";
import {useAuth} from "../contexts/authContext";
import {useChat} from "../contexts/messageContext";
import {useAuthState} from "react-firebase-hooks/auth"
import { auth, db } from '../firebase/firebase';
import {useCollection} from "react-firebase-hooks/firestore"

function ChatContent({sender, message, chats}) {
    
    const [currentUser] = useAuthState(auth)
   
    // const {currentUser} = useAuth();
    const {chatRoom} = useChat();
    const [senderSnap] = useCollection(db.collection("Users").where("email","==",sender));

    const senderData = senderSnap?.docs?.[0]?.data()
    
   

    // var getSender = chats.find((message, index)  =>{
    //     if(message.senderObj != currentUser.uid)
    //         return true;})
    // ${currentUser && currentUser.uid === chats.senderObjId ? 'user-text': 'guest-text'
    return (
        <>
            <div className={`d-flex mb-3 text-container `} >
                <div className='user-list-thumb-wrapper mr-4 align-self-end'>
                    <img src={senderData?.userProfileImageUrl} alt=""/>
                </div>
                <Text text={message.message}/>
            </div>
            {/*<small>{timeConverter(chats.dateTime.seconds,'H-M')}</small>*/}
            <small className={`text-light `}>{senderData?.userName}</small>

        </>

    );
}

export default ChatContent;