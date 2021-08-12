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
import DisplayPicture from "./DisplayPicture";
import moment from "moment";

function MessageCard({id, chats}) {

    const history = useHistory()
    const [currentUser] = useAuthState(auth)
    // const receiverEmail = getReceiverUid(chats?.members,currentUser)
    // const [receiverSnap] = useCollection(db.collection("Users").where("userId","==",receiverEmail));
    //Get unread messages
    //This will return chat objects in which the current user is  in the deliveredTo array
    const [messagesSnap,error] = useCollection(db.collection('ChatRooms').doc(chats.chatRoomId).collection('chat').orderBy('dateTime','desc'))
    const [readMessagesSnap] = useCollection(db.collection('ChatRooms').doc( chats.chatRoomId).collection('chat').where('deliveredToParticipants','array-contains',currentUser?.uid))
    // const receiver = receiverSnap?.docs?.[0]?.data()
    const [receiver] =chats.participants.filter( (receiverObj) =>{
        if(receiverObj.objId !== currentUser.uid)
            return receiverObj

    } )



    const enterChat = () => {
        // console.log(id);
        setSelectedChat(true)
        if(messagesSnap?.docs.length - readMessagesSnap?.docs.length > 0){
            db.collection('ChatRooms').doc(id).collection('chat')
                .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.update({deliveredToParticipants:firebase.firestore.FieldValue.arrayUnion(currentUser?.uid)})

                })
            })

                .then(() =>{
                    history.push(`/messages/${id}`)

                })
                .catch(e =>{
                    console.log(e.message)
                })

        }
        else
            history.push(`/messages/${id}`)


    }

    const [selectedChat ,setSelectedChat] =useState(false);
    const [lastMessage ,setLastMessage] =useState([]);
    const [loading ,setLoading] =useState(false);
    const [messageNotification ,setMessageNotification] =useState(true);
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
    // console.log(chats);
    // const [recentSnap] = useCollection(db.collection("Recent").where("chatRoomID","==",chats.chatRoomId));

    // const recent = recentSnap?.docs?.[0]?.data();

    // useEffect(() => {
    //     dispatch({
    //         type:"SET_OTHER_USER",
    //         otherUser:receiver?.userName
    //     })
    // },[])
    // const [recentSnap] = useCollection(db.collection("Recent").where("chatRoomId","==",chats.chatRoomId));
    // const recent = recentSnap?.docs?.[0]?.data()
    // console.log(receiverSnap);

        // console.log(error)
        // if( messagesSnap && messagesSnap.docs[0] !== undefined) {
        //     console.log(messagesSnap.docs.map(doc => doc.data()))
        //     setLastMessage(messagesSnap.docs[0].data())
        //
        //
        //     // setReadMessages(snapshot.docs?.map( doc =>doc.data()))
        //
        //     messagesSnap.docChanges().forEach((change) => {
        //         if (change.type === "added") {
        //
        //             console.log("current: ", change.doc.data());
        //             // setLastMessage(change.doc.data())
        //         }
        //         if (change.type === "modified") {
        //             console.log("has read : ", change.doc.data());
        //         }
        //         if (change.type === "removed") {
        //             console.log("Removed city: ", change.doc.data());
        //         }
        //     })
        // }

        // readMessagesList=[]
        // var readMessages =
        //
        //     messageList.map((person) =>{
        //         person.deliveredToParticipants?.filter( (id) =>{
        //             if(id === currentUser.uid)
        //                 readMessagesList.push(person)
        //             console.log(id === currentUser.uid)
        //             return readMessages
        //
        //         } )
        //     })


    // setTotalNotificationCount(chats.counter-readMessages)







    // {
    //     currentUser.uid !== chats.fromUserId ? setMessageNotification(true)
    //         :
    //         setMessageNotification(false)
    //
    // }
    // {
    //     chats.counter - readMessages === 0 ? setMessageNotification(false): setMessageNotification(true)
    // }

    //Read message
    // const messageRead = (docId,subCollectionId,chats) =>{
    //     //If message card is opened/clicked and current User is not sender
    //     //Update deliveredTo field in Firestore ChatRoom Document

    //     {
    //         currentUser.uid !== chats.fromUserId &&

    //             setMessageNotification(false)
    //             updateFirestoreSubCollection('ChatRooms',docId,'chat',subCollectionId,chats)
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
    //     setLoading(true)
    //
    //     var chats = {
    //         dateLastUpdated: Date.now(),
    //         groupChatName: idRef.current.attributes.chatname.value,
    //         groupImageUrl:imageRef.current.attributes.src.value,
    //         isGroupChat: false,
    //         participants: [{objId : currentUser.uid,userName: currentUser.displayName,email: currentUser.email},{objId : idRef.current.attributes.userId.value,userName: idRef.current.attributes.chatname.value}]
    //
    //     }
    //     setChatRoom(chats)
    //
    //     setSelectedChat(true)
    //
    //     //Fetch all the chats selected from the message card selected in the ChatRooms Document
    //     //Ordered by descending timestamp
    //
    //      db.collection('ChatRooms').doc( idRef.current.id).collection('chat').orderBy('dateTime','desc').limit(15).onSnapshot(async snapshot => {
    //
    //         await setChat(snapshot.docs.map(doc =>doc.data() ).reverse())
    //
    //
    //     })
    //     console.log(chat)
    //
    //     {
    //         chat.length && chat.map((chatDoc) => {
    //             messageRead(idRef.current.id, chatDoc.chatId, {deliveredToParticipants: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)})
    //
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
    //
    //
    // console.log(receiver);
    // console.log(chats);
    //
    // }
    return (
        <>

            {/* <div onClick={enterChat} >
        <p>{chats.isGroupChat ? chats.groupChatName :receiver.userName}</p>
    </div> */}

            <div style={{background:selectedChat && '#13161AC3'}} onClick={enterChat} userId={receiver.userId}
                 id={id}
                 className='d-flex pointer mb-2 user-list-sub-section'>

                <div className='user-list-thumb-wrapper'>
                    {/*<img ref={imageRef} src={ chats.type === "group"? chats?.profileimageUrl : receiver?.userProfileImageUrl }alt=""/>*/}
                    <img ref={imageRef} src={ chats.isGroupChat ? chats.groupImageUrl:  receiver.userProfileImage}alt=""/>
                </div>
                <div className='ml-3 text-light w-100'>
                    {/*<span>{chats.type === "group" ? chats?.groupChatName : receiver?.userName}</span>*/}
                    <span>{chats.isGroupChat ? chats.groupChatName  : receiver.userName}</span>
                    <span className=' float-right d-flex flex-column align-items-center justify-contents-center space-light'>
        <small>{moment(chats.dateLastUpdated?.seconds * 1000).format("DD/MM/YYYY h:mm")}</small>
        <>
            {
                messagesSnap?.docs.length - readMessagesSnap?.docs.length > 0 &&
                <span
                      className={`message-card-notification text-light mt-1`}>
        <span
            className={`mx-auto mt-auto mb-auto`}>{messagesSnap.docs.length - readMessagesSnap.docs.length }</span>
    </span>
            }
        </>
    </span>
                    <div className="space-light">  {!loading && messagesSnap?.docs[0] !== undefined && messagesSnap.docs[0].data().text}</div>
                    {/* {chats.type === "group" ? chats?.groupChatName :receiver?.userName} */}

                </div>
            </div>


            {/* ref={idRef} chatname={chat.fromUserName === currentUser.displayName ? chats.withUserName : chats.fromUserName } userId={receiver?.userId} */}
            {/* {!loading && chats.lastMessage} */}
        </>




    );
}

export default MessageCard;
{/* <p>{chats.isGroupChat ? chats?.groupChatName :receiver?.userName}</p> */}
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