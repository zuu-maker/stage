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
    getSubCollection,
    pushFireStoreData,
    pushSubCollection,
    updateFirestoreDocument, updateFirestoreSubCollection
} from "../helper/helper";
import {useLoader} from "../contexts/loaderContext";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../contexts/authContext";
import firebase from "firebase";
import {db} from "../firebase/firebase";
import {Dropdown} from "react-bootstrap";
import arrow from "../images/arrow.svg";

const MessageWindow = ({}) => {
    const {chat,setChat ,recent,setOpenedChat,openedChat,setRecent,chatRoom} = useChat();
    const {currentUser} = useAuth();
    const scrollView = useRef();
    const {setLoader} = useLoader();
    const [textId ,setTextId] =useState()
    const [receiver ,setReceiver] =useState()
    const [sender,setSender] = useState('')
    const [loading,setLoading] = useState(false)
     let params = useParams();
    var messageId = params.id;
    const [input,setInput] = useState('');
    let readMessagesList =[]
    let messageList = []
    // const textClass = currentUser.uid === ? 'sent' : 'received'
    var recentData;

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
        //                 if(id === currentUser.uid)
        //                     readMessagesList.push(person)
        //                     console.log(id === currentUser.uid)
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
    const handleSendText = async (event)  => {
        setLoading(true)
        setSender(currentUser.uid)
        event.preventDefault()
        setInput(event.target.message.value)
        let members = [];
        { chatRoom &&
            chatRoom.participants.map(userId => {members.push(userId.objId)})

        }
        var withUserObj;

         { chatRoom &&
        chatRoom.participants?.filter(async userObj => {
            if (userObj.objId != currentUser.uid)

                console.log(userObj)
            await setReceiver(userObj)
            return userObj
        })

        }
        //Message object
        var data = {
            text: event.target.message.value,
            senderEmail: currentUser.email,
            senderObjId: currentUser.uid,
            userProfileImageUrl: currentUser.photoURL,
            senderName:currentUser.displayName,
            isDelivered:false,
            isImage: false,
            isVideo: false,
            isVoiceNote: false,
            storageMediaUrl:'',
            deliveredToParticipants: [],
            chatRoomId: params.id,


            dateTime: firebase.firestore.FieldValue.serverTimestamp()
        }

        //Recent message object
        { chatRoom.participants ?
            recentData = {
                chatRoomID: params.id,
                // counter: 0,
                date: Date.now(),
                lastMessage: event.target.message.value,
                membersToPush: members,
                members: members,
                type: members.length <= 2 ? 'private' : 'group',
                fromUserId: currentUser.uid,
                fromUserName: currentUser.displayName,
                fromUserProfileimageUrl: currentUser.photoURL,
                withUserName: receiver.userName,
                withUserUserID: receiver.objId,
                userProfileimageUrl: receiver.userProfileImage
                // dateTime : firebase.firestore.FieldValue.serverTimestamp()
            }
            :
            <></>
        }
        // Send text message
        //Push message object to chats sub-collection in ChatRooms firestore collection

        await db.collection('ChatRooms').doc(params.id).collection('chat').add(data)
            .then((docRef) => {
                setTextId(docRef.id)

                //Update message chatId field
                docRef.update({chatId: docRef.id})


                Object.assign(data, {chatId: docRef.id})
                var updatedTexts = chat?.filter( (message) =>{
                    if(message.chatRoomId === params.id)
                        return message

                } )
                setChat([...updatedTexts, data])

                //Check if chatroomId exists in the Recent collection
                // If true, update the existing records accordingly
                // If false create a recent document
                console.log('before recent')
                  db.collection('Recent').where('chatRoomID', '==', params.id)
                    .get()
                    .then(  snapshot => {
                        let recentArray =  snapshot.docs.map(doc => doc.data())
                        console.log(snapshot.docs)
                        console.log(recentArray)

                        //If there is a recent chat Id that matches the chat room Id from the URL parameters
                        //Update the last message and timestamp
                        if (recentArray.length >  0 ) {
                            recentArray.forEach((r) => {
                                setRecent(r)
                                console.log(r)

                                const recentObj = Object.assign(recentData, {recentId: r.recentId})
                                console.log(recentObj)

                                //Update Recent Document
                                db.collection('Recent').doc(r.recentId).update({
                                    date: Date.now(),
                                    lastMessage: recentData.lastMessage,
                                    // withUserName: data.senderName,
                                    // withUserUserID: data.senderObjId,
                                    // userProfileimageUrl: data.userProfileImageUrl,
                                    counter: r.counter + 1
                                }).then(
                                    ()=>{

                                    }
                                )


                            })
                        }

                        //Create new recent document if the chatroomId does not match any chatroomId in the recent document collection
                        else{
                                db.collection('Recent').add(recentData).then(function (docRef) {
                                    docRef.update({recentId: docRef.id,counter: 1})
                                })

                        }





                        }
                    ).catch((e) => {
                        console.log(e)
                    })

                // }


            }).catch((err) => {
                console.log(err)
            })



        setInput('')
        scrollView.current.scrollIntoView({behavior: 'smooth'})
        setLoading(false)

    }

    return (
        <>

                    <>
                        <div className='d-flex center mb-2'>
                            <div className='user-list-thumb-wrapper'>
                                <img src={chatRoom.groupImageUrl} alt=""/>
                            </div>
                            <div className='ml-3 text-light'>
                                <div className='space-medium'>{chatRoom.groupChatName}</div>

                            </div>


                            <div className=' chat-icon-group mr-0 ml-auto d-flex'>
                                <div className={` lg-view-flex`}>
                                    <Icon props={{backgroundColor: '#2B3038',image: deposit} }/>
                                    <Icon props={{backgroundColor: '#2B3038',image: deposit} }/>
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

                                { chat ? chat.map(chats  =>{
                                    return(<>
                                            { chats.text ? <>
                                                <ChatContent sender={sender} chats={chats} key={chats.chatId} />


                                            </> : <></>}



                                        </>
                                    )
                                }) : ''}


                            <div ref={scrollView}></div>


                        </div>
                        <form onSubmit={handleSendText} className=' d-flex chat-input'>


                            <input value={input} onChange={(e) => setInput(e.target.value)} name='message' placeholder='Enter Message' type="text" style={{backgroundImage: `url(${user})`}}/>
                        </form>
                    </>


        </>

    );
};

export default MessageWindow;