import React, {useEffect, useRef} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import dummy from "../images/dummy.png";
import Search from "../sections/search/search";
import {checkDate, getSubCollection, timeConverter} from "../helper/helper";
import {useChat} from "../contexts/messageContext";
import {useLoader} from "../contexts/loaderContext";
import {db} from "../firebase/firebase";
import firebase from "firebase";
import {useAuth} from "../contexts/authContext";
import deposit from "../images/deposit_fund.svg";
import Icon from "./icon";

function MessageCard({chats}) {
    const history = useHistory()

    const idRef = useRef();
    const imageRef = useRef();
    const {chat, setChatName,setShow,setChatRoom,counter,setCounter, setChatRoomId, setChat, setOpenedChat} = useChat();
    const {setLoader} = useLoader();
    const {currentUser} = useAuth();
    let params = useParams();
    var messageId = params.id;

    useEffect(()=>{
        var count = counter+1
        setCounter(count)
    },[])

    const openChat = async (e) => {
        setLoader(true)
        var data = {
            dateLastUpdated: Date.now(),
            groupChatName: idRef.current.attributes.chatname.value,
            groupImageUrl:imageRef.current.attributes.src.value,
            isGroupChat: false,
            participants: [{objId : currentUser.uid,userName: currentUser.displayName,email: currentUser.email},{objId : idRef.current.attributes.userId.value,userName: idRef.current.attributes.chatname.value}]

        }
        setChatRoom(data)

        setOpenedChat(true)
        await db.collection('ChatRooms').doc( idRef.current.id).collection('chat').orderBy('dateTime').onSnapshot(snapshot => {

            setChat(snapshot.docs.map(doc =>doc.data() ))



        })

        // get a list of all text objects
        // setChat(  await getSubCollection('ChatRooms', idRef.current.id, 'chat','dateTime'))
        setLoader(false)
        history.push(`/messages/${ idRef.current.id}`)
        setShow(true)


        console.log(chat)

    }
    return (


        <div onClick={openChat} ref={idRef} chatname={chats.withUserName} userId={chats.withUserUserID  } id={chats.chatRoomID}
             className='d-flex pointer mb-2 user-list-sub-section'>
            <div className='user-list-thumb-wrapper'>
                <img ref={imageRef} src={chats.userProfileimageUrl || chats.userProfileImageUrl} alt=""/>
            </div>
            <div className='ml-3 text-light w-100'>
                <span className='space-medium'>{chats.groupChatName || chats.withUserName}</span>
                {/*<span className={`counter`}></span>*/}
                <span className=' float-right space-light'><small>
                    {timeConverter(parseInt(chats.date), 'D-M-Y')}




                </small></span>
                <div className="space-light">{chats.lastMessage}</div>

            </div>


        </div>


    );
}

export default MessageCard;