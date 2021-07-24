import React, {useEffect, useRef, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import dummy from "../images/dummy.png";
import Search from "../sections/search/search";
import {
    checkDate,
    getReceiverEmail,
    getReceiverUid,
    getSubCollection,
    timeConverter,
    updateFirestoreDocument,
    updateFirestoreSubCollection
} from "../helper/helper";
import {useChat} from "../contexts/messageContext";
import {useLoader} from "../contexts/loaderContext";
import {auth, db} from "../firebase/firebase";
import firebase from "firebase";
import {useAuth} from "../contexts/authContext";
import deposit from "../images/deposit_fund.svg";
import Icon from "./icon";
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from "react-firebase-hooks/firestore"
import { useStateValue } from '../contexts/StateProvider';

function MessageCard({uid,id, data, chats}) {
   
    const [,dispatch] = useStateValue()
    const history = useHistory()
    const [currentUser] = useAuthState(auth)
    const receiverEmail = getReceiverUid(data?.members,currentUser)
    console.log(receiverEmail);
    const [receiverSnap] = useCollection(db.collection("Users").where("userId","==",receiverEmail));

    console.log(data);
    const receiver = receiverSnap?.docs?.[0]?.data()
    console.log(receiver);
    // console.log(receiver);
    // console.log(currentUser);
   
    const enterChat = () => {
        // console.log(id);
        history.push(`/messages/${id}`)
    }
    
    const [selectedChat ,setSelectedChat] =useState(false);
    const [loading ,setLoading] =useState(false);
    const [messageNotification ,setMessageNotification] =useState(false);
    const [readMessages ,setReadMessages] =useState(0);

    const idRef = useRef();
    const imageRef = useRef();
    const {chat, setTotalNotificationCount,totalNotificationCount,setChatName,setShow,setChatRoom,counter,setCounter, setChatRoomId, setChat, setOpenedChat} = useChat();
    const {setLoader,loader} = useLoader();
    // const {currentUser} = useAuth();
    let params = useParams();
    var messageId = params.id;
    let readMessagesList =[]
    let messageList = []
    // console.log(receiver);
    // console.log(data);
    // const [recentSnap] = useCollection(db.collection("Recent").where("chatRoomID","==",data.chatRoomId));

    // const recent = recentSnap?.docs?.[0]?.data();

    // useEffect(() => {
    //     dispatch({
    //         type:"SET_OTHER_USER",
    //         otherUser:receiver?.userName
    //     })
    // },[])
    // const [recentSnap] = useCollection(db.collection("Recent").where("chatRoomId","==",data.chatRoomId));
    // const recent = recentSnap?.docs?.[0]?.data()
    // console.log(receiverSnap);
    
    // useEffect(()=>{
    //     setLoading(true)
    //     //Get unread messages
    //     //This will return chat objects in which the current user is  in the deliveredTo array
    //     db.collection('ChatRooms').doc( chats.chatRoomID).collection('chat').where('deliveredToParticipants','array-contains',currentUser.uid)

    //         .onSnapshot(
    //             (snapshot) => {
    //                 setReadMessages(snapshot.docs?.map( doc =>doc.data()))

    //                 snapshot.docChanges().forEach((change) => {
    //                 if (change.type === "added") {
    //                     // console.log("has read: ", change.doc.data());
    //                 }
    //                 if (change.type === "modified") {
    //                     // console.log("Modified : ", change.doc.data());
    //                 }
    //                 if (change.type === "removed") {
    //                     console.log("Removed city: ", change.doc.data());
    //                 }
    //             })
    //         })
        //         snapshot => {
        //     // messageList = []
                // readMessagesList =   snapshot.docs?.map( doc =>doc.data())
        //     // var filteredMessages = messageList?.filter( (message) =>{
        //     //     if(message.chatRoomId === params.id)
        //     //         return message
        //     //
        //     // } )
        //     // readMessagesList=[]
        //     // var readMessages =
        //     //
        //     //     messageList.map((person) =>{
        //     //         person.deliveredToParticipants?.filter( (id) =>{
        //     //             if(id === currentUser.uid)
        //     //                 readMessagesList.push(person)
        //     //             console.log(id === currentUser.uid)
        //     //             return readMessages
        //     //
        //     //         } )
        //     //     })
        //     // console.log(readMessages)
        //     // console.log(readMessagesList)
        //     // console.log(readMessagesList.length)
        //     //
        //     // console.log(filteredMessages)
        //     // setChat(filteredMessages)
        //         console.log(readMessages)
        //
                // setTotalNotificationCount(chats.counter-readMessages)
        //
        //
        //
        //
        //
        // })

        // {
        //     currentUser.uid !== chats.fromUserId ? setMessageNotification(true)
        //         :
        //         setMessageNotification(false)

        // }
        // {
        //     chats.counter - readMessages === 0 ? setMessageNotification(false): setMessageNotification(true)
        // }
    //     setLoading(false)
    // },[])

    //Read message
    // const messageRead = (docId,subCollectionId,data) =>{
    //     //If message card is opened/clicked and current User is not sender
    //     //Update deliveredTo field in Firestore ChatRoom Document

    //     {
    //         currentUser.uid !== chats.fromUserId &&

    //             setMessageNotification(false)
    //             updateFirestoreSubCollection('ChatRooms',docId,'chat',subCollectionId,data)
    //                 .then(() => {

    //                     console.log(`Updated ${subCollectionId}`)
    //                 })
    //                 .catch(e => {
    //                     setMessageNotification(true)

    //                     console.log(e)
    //                     console.log(e.message)
    //                 })


    //     }

    // }

    //If current user is not the sender of the last message
    //Show a notification badge
    //With the number of unread messages
    // const notification = () =>{
    //     console.log(currentUser.uid !== chats.withUserUserID)
    //     {
    //         currentUser.uid !== chats.withUserUserID ? setMessageNotification(true)
    //         :
    //             setMessageNotification(false)

    //     }
    // }
    // const clickedChatWhereNotSender = (chatIndex) =>{
    //     console.log(this.state.chat)
    //     // this.state.chat[chatIndex - 1].senderObjId != currentUser.uid;

    // }

    // const openChat =  (e) => {
    //     setSelectedChat(true)
    //     setLoading(true)

    //     var data = {
    //         dateLastUpdated: Date.now(),
    //         groupChatName: idRef.current.attributes.chatname.value,
    //         groupImageUrl:imageRef.current.attributes.src.value,
    //         isGroupChat: false,
    //         participants: [{objId : currentUser.uid,userName: currentUser.displayName,email: currentUser.email},{objId : idRef.current.attributes.userId.value,userName: idRef.current.attributes.chatname.value}]

    //     }
    //     setChatRoom(data)

    //     setSelectedChat(true)

    //     //Fetch all the chats selected from the message card selected in the ChatRooms Document
    //     //Ordered by descending timestamp

    //      db.collection('ChatRooms').doc( idRef.current.id).collection('chat').orderBy('dateTime','desc').limit(15).onSnapshot(async snapshot => {

    //         await setChat(snapshot.docs.map(doc =>doc.data() ).reverse())


    //     })
    //     console.log(chat)

    //     {
    //         chat.length && chat.map((chatDoc) => {
    //             messageRead(idRef.current.id, chatDoc.chatId, {deliveredToParticipants: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)})

    //         })
    //     }
    //     // get a list of all text objects
    //     // setChat(  await getSubCollection('ChatRooms', idRef.current.id, 'chat','dateTime'))
    //     // console.log(e.view.$r.props.chats)
    //     console.log(chat)
    //     console.log(chats)
    //     setLoading(false)
    //     history.push(`/messages/${ idRef.current.id}`)
    //     setShow(true)


    // console.log(receiver);
    // console.log(data);

    // }
    return (
<>

    {/* <div onClick={enterChat} >
        <p>{data.isGroupChat ? data.groupChatName :receiver.userName}</p>
    </div> */}
    
    <div style={{background:selectedChat && '#13161AC3'}} onClick={enterChat} userId={receiver?.userId}
         id={id}
         className='d-flex pointer mb-2 user-list-sub-section'>
    <div className='user-list-thumb-wrapper'>
       <img ref={imageRef} src={ data.type === "group"? data?.profileimageUrl : receiver?.userProfileImageUrl }alt=""/>
    </div>
    <div className='ml-3 text-light w-100'>
       <span>{data.type === "group" ? data?.groupChatName : receiver?.userName}</span>
       {/* {data.type === "group" ? data?.groupChatName :receiver?.userName} */}
       <div className="space-light">{data?.lastMessage}</div>
    </div>
    </div>
     

{/* ref={idRef} chatname={chat.fromUserName === currentUser.displayName ? chats.withUserName : chats.fromUserName } userId={receiver?.userId} */}
{/* {!loading && chats.lastMessage} */}
</>




    );
}

export default MessageCard;
{/* <p>{data.isGroupChat ? data?.groupChatName :receiver?.userName}</p> */}
{/* <div className='user-list-thumb-wrapper'>

</div>
<div className='ml-3 text-light w-100'>
<span className='space-medium'>{ chats.fromUserName === currentUser.displayName ? chats.withUserName : chats.fromUserName }</span>


<span className=' float-right d-flex flex-column align-items-center justify-contents-center space-light'>

        <small>{timeConverter(parseInt(chats.date), 'D-M-Y')}</small>
        <>
            {
                  chats.counter - readMessages.length > 0 &&
                <span style={{visibility: messageNotification ? 'visible' : 'hidden'}}
                      className={`message-card-notification text-light mt-1`}>
        <span
            className={`mx-auto mt-auto mb-auto`}>{chats.counter && chats.counter - readMessages.length}</span>
    </span>

            }
        </>
    </span>
<div
    className="space-light">  {!loading && chats.lastMessage}</div> */}
{/*{!loading && chats.fromUserId === currentUser.uid && 'You :' }*/}
{/*{chats.fromUserId === currentUser.uid ? 'You' : chats.withUserName === currentUser.displayName ? chats.fromUserName: 'Null'} :*/}

// </div>
