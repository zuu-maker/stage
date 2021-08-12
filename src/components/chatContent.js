import React, {useRef, useState} from 'react';
import dummy from "../images/dummy.png";
import Text from "./text";
import {useAuth} from "../contexts/authContext";
import {useChat} from "../contexts/messageContext";
import moment from "moment";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase/firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import spinner from "../images/spinner.gif";
export const Modal = ({src, onClose,type}) => {
    return (
        <div className="media-modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
            { type === 'image'?<img className="media-modal-content" src={src}/>
                : type === 'video' ? <video className="media-modal-content" src={src} preload={`true`} autoPlay controls />
                    :
                    <></>
            }
        </div>
    )
}
function ChatContent({message,preview,sender,loading,fileLoading}) {
    const [currentUser] = useAuthState(auth)
    console.log(preview)

    // const {currentUser} = useAuth();
    // const [senderSnap] = useCollection(db.collection("Users").where("email","==",sender));
    //
    // const senderData = senderSnap?.docs?.[0]?.data()
    const {chatRoom} = useChat();
    const [isOpen, setIsOpen] = useState(false)
    const showModal = () => setIsOpen(true)

    return (
        <>
            <div className={`d-flex mb-3 text-container ${currentUser && currentUser.uid === message.senderObjId ? 'user-text': 'guest-text'}`} >
                <div className='user-list-thumb-wrapper align-self-end'>
                    <img src={message.userProfileImageUrl} alt=""/>
                </div>
                {message.text !== '' ?
                    <Text message={message} preview={''}/>
                    : message.isImage || preview ?

                        <img className="image"  onClick={showModal} src={message.storageMediaUrl } alt=""/>
                        // <div className={`d-flex   position-relative`}>
                        //     <img className={`spinner-loader`} width={24} style={{display: fileLoading ? 'flex': 'none'}} src={spinner} alt=""/>
                        //     <img className="image" style={{backgroundImage:`url(${preview})`}} onClick={showModal} src={message.storageMediaUrl } alt=""/>
                        // </div>
                        :
                        message.isVideo|| preview ?
                            <video onClick={showModal} className="image" src={message.storageMediaUrl || preview}  />
                            :
                            <></>}
                {isOpen &&
                <Modal
                    src={message.storageMediaUrl}
                    type = {message.isImage ? 'image': message.isVideo ? 'video':''}
                    onClose={() => setIsOpen(false)}
                />}
            </div>
            {/*<small>{timeConverter(message.dateTime.seconds,'H-M')}</small>*/}

        </>

    );
}

export default ChatContent;
