import React, {useEffect, useRef, useState} from 'react';
import dummy from '../images/dummy.png'
import deposit from "../images/deposit_fund.svg";
import Icon from "./icon";
import ChatContent from "./chatContent";
import user from "../images/arrow right.svg";
import {useChat} from "../contexts/messageContext";
import MessageCard from "./messageCard";
import {
    getRealtimeSubCollection,
    getReceiverEmail,
    getSubCollection,
    pushFireStoreData,
    pushSubCollection,
    updateFirestoreDocument, updateFirestoreSubCollection
} from "../helper/helper";
import {useLoader} from "../contexts/loaderContext";
import {useAuth} from "../contexts/authContext";
import firebase from "firebase";
import {auth, db} from "../firebase/firebase";
import {Dropdown} from "react-bootstrap";
import arrow from "../images/arrow.svg";
import BackButton from "./backButton";
import {useStateValue} from "../contexts/StateProvider"
import {Link, useHistory, useParams} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from "react-firebase-hooks/firestore"
import DisplayName from './DisplayName';
import DisplayPicture from './DisplayPicture';

const MessageWindow = ({}) => {
    const [{user}] = useStateValue()
    const {chat,setChat ,recent,setOpenedChat,openedChat,setRecent,chatRoom} = useChat();
    const [currentUser] = useAuthState(auth)
    let history = useHistory();
    const params = useParams()
    // const receiverEmail = ''
    // const {user} = useAuth();
    const scrollView = useRef();
    const {setLoader} = useLoader();
    const [textId ,setTextId] =useState()
    const [showSendButton ,setShowSendButton] =useState(false)
    // const [receiver ,setReceiver] =useState()
    const [sender,setSender] = useState('')
    // const [loading,setLoading] = useState(false)
    //  let params = useParams();
    var messageId = params.id;
    const [input,setInput] = useState('');
    let readMessagesList =[]
    let messageList = []
    // const textClass = user.uid === ? 'sent' : 'received'
    var recentData;

    // const [chatSnap] = useCollection(db.collection("chats").doc(params.id))
    const [messagesSnap,loading ,error] = useCollection(db.collection("chats").doc(params.id).collection("messages").orderBy("timestamp","asc"));
    // console.log(params.id);
    const [senderSnap] = useCollection(db.collection("chats").where("chatRoomId","==",params.id));
    //  console.log(params.id);

useEffect(()=>{
    scrollView.current.scrollIntoView({behavior: 'smooth'})

},[])

    // senderSnap?.docs?.[0]?.data()

    const groupData = senderSnap?.docs?.[0]?.data();
    const receiverEmail = getReceiverEmail(groupData?.participants,currentUser)




    // console.log(currentUser);

    // const [receiverSnap] = useCollection(db.collection("Users").where("email","==",receiverEmail));

    // const receiver = receiverSnap?.docs?.[0]?.data()
    // console.log(otherUser);
    const showMessages = () => {
        if(messagesSnap){
            return messagesSnap.docs.map(message =>(
                <ChatContent
                    key={message.id}
                    sender={message.data().user}
                    loading={loading}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                    }} />
            ))
        }
    }
    // console.log(currentUser);
    // console.log(groupData);
    useEffect(  () =>{
        // setLoader(true)
        // db.collection('ChatRooms').doc( messageId).collection('chat').orderBy('dateTime').onSnapshot(snapshot => {
        //     messageList = []
        //      messageList =   snapshot.docs?.map( doc =>doc.data())
        //     var filteredMessages = messageList?.filter( (message) =>{
        //         if(message.chatRoomId === params.id)
        //             return message
        //
        //     } )
        //     readMessagesList=[]
        //     var readMessages =
        //
        //         messageList.map((person) =>{
        //             person.deliveredToParticipants?.filter( (id) =>{
        //                 if(id === user.uid)
        //                     readMessagesList.push(person)
        //                     console.log(id === user.uid)
        //                     return readMessages
        //
        //             } )
        //         })
        //     console.log(readMessages)
        //     console.log(readMessagesList)
        //     console.log(readMessagesList.length)
        //
        //     console.log(filteredMessages)
        //     setChat(filteredMessages)
        //
        //
        //
        //
        //
        //
        // })
        // setLoader(false)

    },[])

    //Read message
    const messageRead = () =>{
        updateFirestoreSubCollection('ChatRooms','','','','')
    }

    //Send chat message
    const handleSendText = (e) => {
        e.preventDefault()
        setShowSendButton(false)

        const members = groupData?.participants?.map((participant) => (participant.objectId))

        // var data = {
        //     text: e.target.message.value,
        //     senderEmail: currentUser.email,
        //     senderObjId: currentUser.uid,
        //     userProfileImageUrl: currentUser.photoURL,
        //     senderName:currentUser.displayName,
        //     isDelivered:false,
        //     isImage: false,
        //     isVideo: false,
        //     isVoiceNote: false,
        //     storageMediaUrl:'',
        //     deliveredToParticipants: [],
        //     chatRoomId: params.id,


        //     dateTime: firebase.firestore.FieldValue.serverTimestamp()
        // }

        db.collection("chats").doc(params.id).collection("messages").add({
            chatRoomId: params.id,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:currentUser.email,
            photoURL:currentUser.photoURL,
            isDelivered:false,
            isImage: false,
            isVideo: false,
            isVoiceNote: false,
            storageMediaUrl:'',
            senderName:currentUser.displayName,
            senderObjId: currentUser.uid,
            dateTime: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(docRef => {
                db.collection("Recent").where("chatRoomID", "==", params.id).get()
                    .then(snapshot => {
                        let recentArray =  snapshot.docs.map(doc => doc.data())
                        // console.log(recentArray.length);

                        if (recentArray.length >  0 ) {
                            recentArray.forEach((r) => {
                                setRecent(r)

                                //Update Recent Document
                                db.collection('Recent').doc(r.recentId).update({
                                    date: Date.now(),
                                    lastMessage: input,
                                    fromUserId: currentUser.uid,
                                    fromUserName: currentUser.displayName,
                                    fromUserProfileimageUrl: currentUser.photoURL,
                                    counter: r.counter + 1
                                }).then(
                                    ()=>{

                                    }
                                )


                            })
                        }else{


                            db.collection('Recent').add({
                                chatRoomID: params.id,
                                date: Date.now(),
                                groupChatName: groupData.isGroupChat ? groupData.groupChatName : " ",
                                lastMessage: input,
                                membersToPush: members,
                                members: members,
                                type:groupData.isGroupChat ? 'group': 'private',
                                fromUserId: currentUser.uid,
                                fromUserName: currentUser.displayName,
                                fromUserProfileimageUrl: currentUser.photoURL,
                                // date: Date.now(),

                                // chatRoomID: params.id,
                            }).then(function (docRef) {

                                docRef.update({recentId: docRef.id,counter: 1})
                            }).catch(() => {
                            })

                        }
                    }).catch(err => {
                    // console.log(err.message);
                })
            }).catch((err) => {
            console.log(err.message)
        })

        setInput('')
        scrollView.current.scrollIntoView({behavior: 'smooth'})
        // setLoading(false)

    }

    // setLoading(true)
    // setSender(user.uid)
    // event.preventDefault()
    // setInput(event.target.message.value)
    // let members = [];
    // { chatRoom &&
    //     chatRoom.participants.map(userId => {members.push(userId.objId)})

    // }
    // var withUserObj;

    //  { chatRoom &&
    // chatRoom.participants?.filter(async userObj => {
    //     if (userObj.objId != user.uid)

    //         console.log(userObj)
    //     await setReceiver(userObj)
    //     return userObj
    // })

    // }
    // //Message object
    // var data = {
    //     text: event.target.message.value,
    //     senderEmail: user.email,
    //     senderObjId: user.uid,
    //     userProfileImageUrl: user.photoURL,
    //     senderName:user.displayName,
    //     isDelivered:false,
    //     isImage: false,
    //     isVideo: false,
    //     isVoiceNote: false,
    //     storageMediaUrl:'',
    //     deliveredToParticipants: [],
    //     chatRoomId: params.id,


    //     dateTime: firebase.firestore.FieldValue.serverTimestamp()
    // }

    // //Recent message object
    // { chatRoom.participants ?
    //     recentData = {
    //         chatRoomID: params.id,
    //         // counter: 0,
    //         date: Date.now(),
    //         lastMessage: event.target.message.value,
    //         membersToPush: members,
    //         members: members,
    //         type: members.length <= 2 ? 'private' : 'group',
    //         fromUserId: user.uid,
    //         fromUserName: user.displayName,
    //         fromUserProfileimageUrl: user.photoURL,
    //         withUserName: receiver.userName,
    //         withUserUserID: receiver.objId,
    //         userProfileimageUrl: receiver.userProfileImage
    //         // dateTime : firebase.firestore.FieldValue.serverTimestamp()
    //     }
    //     :
    //     <></>
    // }
    // Send text message
    //Push message object to chats sub-collection in ChatRooms firestore collection

    // await db.collection('ChatRooms').doc(params.id).collection('chat').add(data)
    //     .then((docRef) => {
    //         setTextId(docRef.id)

    //         //Update message chatId field
    //         docRef.update({chatId: docRef.id})


    //         Object.assign(data, {chatId: docRef.id})
    //         var updatedTexts = chat?.filter( (message) =>{
    //             if(message.chatRoomId === params.id)
    //                 return message

    //         } )
    //         setChat([...updatedTexts, data])

    //Check if chatroomId exists in the Recent collection
    // If true, update the existing records accordingly
    // If false create a recent document
    // console.log('before recent')
    //   db.collection('Recent').where('chatRoomID', '==', params.id)
    //     .get()
    //     .then(  snapshot => {
    //         let recentArray =  snapshot.docs.map(doc => doc.data())
    //         console.log(snapshot.docs)
    //         console.log(recentArray)

    //If there is a recent chat Id that matches the chat room Id from the URL parameters
    //Update the last message and timestamp
    // if (recentArray.length >  0 ) {
    //     recentArray.forEach((r) => {
    //         setRecent(r)
    //         console.log(r)

    //         const recentObj = Object.assign(recentData, {recentId: r.recentId})
    //         console.log(recentObj)

    //Update Recent Document
    // db.collection('Recent').doc(r.recentId).update({
    //     date: Date.now(),
    //     lastMessage: recentData.lastMessage,
    //     // withUserName: data.senderName,
    // withUserUserID: data.senderObjId,
    // userProfileimageUrl: data.userProfileImageUrl,
    //     counter: r.counter + 1
    // }).then(
    //     ()=>{

    //     }
    // )


    // })
    // }

    //Create new recent document if the chatroomId does not match any chatroomId in the recent document collection
    // else{
    //         db.collection('Recent').add(recentData).then(function (docRef) {
    //             docRef.update({recentId: docRef.id,counter: 1})
    //         })

    // }





    //     }
    // ).catch((e) => {
    //     console.log(e)
    // })

    // }


    // }).catch((err) => {
    //     console.log(err)
    // })
    // console.log(groupData?.users);
    // console.log(groupData?.groupChatName);

    return (
        <>

            <>

                <div className='d-flex center chat-header mb-2'>
                    <BackButton/>
                    {receiverEmail &&
                        <div className={`lg-view-flex d-md-none`}>
                    <DisplayPicture
                        chatRoom={chatRoom}
                        receiver={receiverEmail}
                    /></div>}
                    <div className='ml-3 text-light guest-name'>
                        {receiverEmail && <DisplayName groupName={groupData?.groupChatName} receiver={receiverEmail}/>}


                    </div>


                    <div className=' chat-icon-group mr-0 ml-auto d-flex'>
                        <div className={` lg-view-flex`}>

                        </div>

                        <Dropdown className={`ml-2`}>
                            <Dropdown.Toggle variant="" id="">
                                <div className={' icon-wrapper   pointer text-center'}><div className={'dots-dropdown'}>&#8942;</div></div>

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item  ><Link >Invite Participants</Link></Dropdown.Item>
                                <Dropdown.Item  >Exit Group</Dropdown.Item>
                                <Dropdown.Item  >Delete Group</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>




                </div>

                <div className={`chat-container`}>

                    {/* { chat ? chat.map(chats  =>{
                                    return(<>
                                            { chats.text ? <>
                                                <ChatContent sender={sender} chats={chats} key={chats.chatId} />
                                            </> : <></>}
                                        </>
                                    )
                                }) : ''} */}
                    {showMessages()}

                    <div ref={scrollView}></div>


                </div>
                <form onSubmit={handleSendText} className=' d-flex chat-input align-items-center'>
                    {/*<input*/}
                    {/*    name={`media`}*/}
                    {/*    type="file"*/}
                    {/*    ref={hiddenFileInput}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    style={{display: 'none'}}*/}

                    {/*/>*/}
                    {/*{preview && <img height={30} src={preview}/>}*/}

                    <input value={input} onChange={(e) => {setInput(e.target.value);setShowSendButton(true)}} name='message'
                           placeholder='Enter Message' type="text" />
                    <>{showSendButton && input !== "" ? <button type={`submit`} className={`btn m-2 w-25`}>Send</button> : <><div className={' icon-wrapper   pointer text-center'}></div><div className={' icon-wrapper   pointer text-center'}></div></> }</>
                </form>
                <br/>
                <br/>
                <br/>
            </>


        </>

    );
};

export default MessageWindow;