import React, {useRef} from 'react';
import {Link, useHistory} from "react-router-dom";
import dummy from "../images/dummy.png";
import Search from "../sections/search/search";
import {getSubCollection} from "../helper/helper";
import {useChat} from "../contexts/messageContext";
import {useLoader} from "../contexts/loaderContext";

function MessageCard({chats}) {
    const history = useHistory()

    const idRef = useRef();
    const {chat,setChatName ,setChatRoomId,setChat,setOpenedChat} = useChat();
    const {setLoader} = useLoader();

    const openChat = async (e) =>{
        setLoader(true)
        setChatName(idRef.current.attributes.chatname.value)
        setChatRoomId(idRef.current.id)
        console.log(chat)
        // setChatName(idRef.current.attributes.groupImgUrl.value)
        setOpenedChat(true)

        // get a list of all text objects
         setChat(await getSubCollection('ChatRooms',idRef.current.id,'chat'))
        setLoader(false)

        console.log(chat)

    }
    return (



                    <div onClick={openChat} ref={idRef} chatname={chats.groupChatName} id={chats.chatRoomId} className='d-flex pointer mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={chats.groupImageUrl} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >{chats.groupChatName}</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">chats</div>

                        </div>


                    </div>




    );
}

export default MessageCard;