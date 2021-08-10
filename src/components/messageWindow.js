import React, {useEffect, useRef, useState} from 'react';
import ChatContent from "./chatContent";
import {useChat} from "../contexts/messageContext";
import {getReceiverEmail} from "../helper/helper";
import {useLoader} from "../contexts/loaderContext";
import firebase from "firebase";
import {auth, db, storage} from "../firebase/firebase";
import {Dropdown} from "react-bootstrap";
import BackButton from "./backButton";
import {useStateValue} from "../contexts/StateProvider"
import {Link, useHistory, useParams} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection, useDocumentOnce} from "react-firebase-hooks/firestore"
import DisplayName from './DisplayName';
import spinner from '../images/spinner.gif'
import {useObject} from "react-firebase-hooks/database";

const MessageWindow = ({}) => {
    const [{user,userData}] = useStateValue()
    const {chat,setChat ,recent,setOpenedChat,openedChat,setRecent,chatRoom} = useChat();
    const [currentUser] = useAuthState(auth)
    let history = useHistory();
    const params = useParams()
    // const receiverEmail = ''
    // const {user} = useAuth();
    const scrollView = useRef();
    const [preview, setPreview] = useState()
    const [file, setFile] = useState('');

    const [previewImageOnSend, setPreviewImageOnSend] = useState([])

    const {setLoader} = useLoader();
    const [textId ,setTextId] =useState()
    const [showSendButton ,setShowSendButton] =useState(false)
    // const [receiver ,setReceiver] =useState()
    const [sender,setSender] = useState('')
    const [fileLoading,setFileLoading] = useState(false)
    //  let params = useParams();
    var messageId = params.id;
    const [input,setInput] = useState('');
    let readMessagesList =[]
    const hiddenFileInput = React.useRef(null);

    let messageList = []
    // const textClass = user.uid === ? 'sent' : 'received'
    var recentData;

    // const [chatSnap] = useCollection(db.collection("chats").doc(params.id))
    const [messagesSnap,loading ,error] = useCollection(db.collection('ChatRooms').doc(params.id).collection('chat').orderBy("dateTime","asc"));
    // console.log(params.id);
    const [chatRoomSnap] = useDocumentOnce(db.collection("ChatRooms").where("chatRoomId","==",params.id));
    //  console.log(params.id);


    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleSendMedia = (event) => {
        setFile('')
        hiddenFileInput.current.click();

    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        setFile(event.target.files[0])
        const fileUploaded = event.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(fileUploaded);

        reader.onloadend = function (e) {
            setPreview(reader.result)
        }
        console.log(preview)
        console.log(url)
        console.log(event.target.files[0])
    };
useEffect(()=>{
    scrollView.current.scrollIntoView({behavior: 'smooth'})

},[])


    const chatRoomObject = chatRoomSnap?.docs[0]?.data();
    console.log(chatRoomObject)
    const receiverEmail = getReceiverEmail(chatRoomObject?.participants,currentUser)
    const receiverObject =  chatRoomObject?.participants?.filter(userObj =>{
        if(userObj.objectId !== user.uid)
            return userObj
    })



    // console.log(currentUser);

    // const [receiverSnap] = useCollection(db.collection("Users").where("email","==",receiverEmail));
    //
    // const receiver = receiverSnap?.docs?.[0]?.data()
    // console.log(receiver)
    // console.log(otherUser);
    const showMessages = () => {
        if(messagesSnap){
            return messagesSnap.docs.map(message =>(
                <ChatContent
                    key={message.id}
                    sender={message.data().user}
                    preview={''}
                    loading={loading}
                    message={
                        message.data()
                    } />
            ))
        }
    }
    // console.log(currentUser);
    // console.log(chatRoomObject);
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
    // const messageRead = () =>{
    //     updateFirestoreSubCollection('ChatRooms','','','','')
    // }
    //Send chat message
    const handleSendText = async (e) => {
        e.preventDefault()
        setShowSendButton(false)

        const members = chatRoomObject?.participants?.map((participant) => (participant.objectId))

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
        if (file && file.size) {
            setFileLoading(true)
            // setPreviewImageOnSend([...previewImageOnSend,preview])
            setPreviewImageOnSend(preview)
            // Push File to the firebase storage
            await storage.ref(`chatRoom/${params.id}/chats/media`).put(file)
                .then(snapshot => {
                    console.log('pushed to storage')
                    setFile('')

                    //Fetch the file url
                    snapshot.ref.getDownloadURL().then((url) => {
                        console.log(url)
                        var data = {
                            text: e.target.message.value,
                            senderEmail: currentUser.email,
                            senderObjId: currentUser.uid,
                            userProfileImageUrl: userData?.userProfileImageUrl,
                            senderName: userData?.userName,
                            isDelivered: false,
                            isImage: false,
                            isVideo: false,
                            isVoiceNote: false,
                            storageMediaUrl: url,
                            deliveredToParticipants: [],
                            chatRoomId: params.id,
                            dateTime: firebase.firestore.FieldValue.serverTimestamp()
                        }

                        if (file.type.match('image.*')) {
                            data.storageMediaUrl = url;
                            data.isImage =true
                        } else if (file.type.match('video.*')) {
                            data.storageMediaUrl = url;
                            data.isVideo =true
                        } else if (file.type.match('audio.*')) {

                            data.storageMediaUrl = url;
                            data.isVoiceNote =true
                        } else
                            data.storageMediaUrl = url;

                        db.collection('ChatRooms').doc(params.id).collection('chat').add(data)
                            .then(async docRef => {
                                console.log('added')
                                //Update message chatId field
                                await docRef.update({chatId: docRef.id})
                                db.collection("Recent").where("chatRoomID", "==", params.id).get()
                                    .then(snapshot => {
                                        let recentArray = snapshot.docs.map(doc => doc.data())
                                        // console.log(recentArray.length);

                                        if (recentArray.length > 0) {
                                            recentArray.forEach((r) => {
                                                setRecent(r)
                                                var recentData={
                                                    date: Date.now(),
                                                    lastMessage: input,
                                                    fromUserId: currentUser.uid,
                                                    fromUserName: currentUser.displayName,
                                                    fromUserProfileimageUrl: currentUser.photoURL,
                                                    counter: firebase.firestore.FieldValue.increment(1)
                                                }
                                                if (file.type.match('image.*')) {
                                                    recentData.lastMessage = '[Image]';
                                                } else if (file.type.match('video.*')) {
                                                    recentData.lastMessage = '[Video]';
                                                } else if (file.type.match('audio.*')) {

                                                    recentData.lastMessage = '[Audio]';
                                                } else
                                                    recentData.lastMessage = '';

                                                //Update Recent Document
                                                db.collection('Recent').doc(r.recentId).update(recentData).then(
                                                    () => {

                                                    }
                                                )

                                            })
                                        } else {


                                            db.collection('Recent').add({
                                                chatRoomID: params.id,
                                                date: Date.now(),
                                                groupChatName: chatRoomObject.isGroupChat ? chatRoomObject.groupChatName : " ",
                                                lastMessage: input,
                                                membersToPush: members,
                                                members: members,
                                                type: chatRoomObject.isGroupChat ? 'group' : 'private',
                                                fromUserId: currentUser.uid,
                                                fromUserName: currentUser.displayName,
                                                fromUserProfileimageUrl: currentUser.photoURL,
                                                // date: Date.now(),

                                                // chatRoomID: params.id,
                                            }).then(function (docRef) {

                                                docRef.update({recentId: docRef.id, counter: firebase.firestore.FieldValue.increment(1)})
                                            }).catch(() => {
                                            })

                                        }
                                    }).catch(err => {
                                    // console.log(err.message);
                                })
                            }).catch((err) => {
                            console.log(err.message)
                        })
                        // // Update Chatroom storageMedia field
                        // updateFirestoreSubCollection('ChatRooms', params.id, 'chat', docRef.id, updatedInfo)
                        // // var latestRecentObj = Object.assign(recentSnapshot.data(),{storageMediaUrl:url})
                        // console.log('updated firestore')



                    })
                    setFile('')

                    setFileLoading(false)
                    setPreviewImageOnSend('')

                })
                .catch(error => {
                    setLoader(false)
                    console.log(error)
                })




        }

        db.collection('ChatRooms').doc(params.id).collection('chat').add({
            text: e.target.message.value,
            senderEmail: currentUser.email,
            senderObjId: currentUser.uid,
            userProfileImageUrl: userData?.userProfileImageUrl,
            senderName: userData?.userName,
            isDelivered: false,
            isImage: false,
            isVideo: false,
            isVoiceNote: false,
            storageMediaUrl: '',
            deliveredToParticipants: [],
            chatRoomId: params.id,
            dateTime: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(async docRef => {
                console.log('added')
                //Update message chatId field
                await docRef.update({chatId: docRef.id})
                db.collection("Recent").where("chatRoomID", "==", params.id).get()
                    .then(snapshot => {
                        let recentArray = snapshot.docs.map(doc => doc.data())
                        // console.log(recentArray.length);

                        if (recentArray.length > 0) {
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
                                    () => {

                                    }
                                )


                            })
                        } else {


                            db.collection('Recent').add({
                                chatRoomID: params.id,
                                date: Date.now(),
                                groupChatName: chatRoomObject.isGroupChat ? chatRoomObject.groupChatName : " ",
                                lastMessage: input,
                                membersToPush: members,
                                members: members,
                                type: chatRoomObject.isGroupChat ? 'group' : 'private',
                                fromUserId: currentUser.uid,
                                fromUserName: currentUser.displayName,
                                fromUserProfileimageUrl: currentUser.photoURL,
                                // date: Date.now(),

                                // chatRoomID: params.id,
                            }).then(function (docRef) {

                                docRef.update({recentId: docRef.id, counter: 1})
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
    // console.log(chatRoomObject?.users);
    // console.log(chatRoomObject?.groupChatName);

    return (
        <>

            <>

                <div className='d-flex center chat-header mb-2'>
                    <BackButton/>
                    <div className='user-list-thumb-wrapper'>
                        {/*<img src={chatRoomObject.userProfileImageUrl} alt=""/>*/}
                    </div>
                    <div className='ml-3 text-light guest-name'>
                        {/*{receiverEmail && <DisplayName groupName={chatRoomObject?.groupChatName} receiver={receiverEmail}/>}*/}
                        {chatRoomObject?.isGroupChat ? chatRoomObject.groupChatName  : receiverObject?.userName}

                    </div>


                    <div className=' chat-icon-group mr-0 ml-auto d-flex'>
                        <div className={` lg-view-flex`}>

                        </div>

                        <Dropdown className={`ml-2`}>
                            <Dropdown.Toggle variant="" id="">
                                <div className={' icon-wrapper   pointer text-center'}><div className={'dots-dropdown'}>&#9432;</div></div>

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

                    {/*{chat ? chat.map(chats => {*/}
                    {/*    return (<>*/}
                    {/*            {chats.text || chats.storageMediaUrl ? <>*/}
                    {/*                <ChatContent preview={previewImageOnSend} sender={sender} chats={chats}*/}
                    {/*                             key={chats.chatId}/>*/}


                    {/*            </> : <></>}*/}
                    {/*        </>*/}
                    {/*    )*/}
                    {/*})}*/}
                    {showMessages()}
                    <>
                        {previewImageOnSend &&
                        <div className={`d-flex  text-container position-relative`}>
                            <img className={`spinner-loader`} width={24} style={{display: fileLoading ? 'flex': 'none'}} src={spinner} alt=""/>
                            <img src={previewImageOnSend} alt=""/>
                        </div>
                        }
                    </>

                    <div ref={scrollView}></div>


                </div>
                <form onSubmit={handleSendText} className=' d-flex chat-input '>
                    <input
                        accept="image/x-png,image/gif,image/jpeg"
                        name={`media`}
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{display: 'none'}}

                    />
                    <div className={`preview-image-wrapper overflow-hidden`}>
                        {preview && <img  src={preview}/>}

                    </div>


                    <input value={input} onChange={(e) => {setInput(e.target.value);setShowSendButton(true)}} name='message'
                           placeholder='Enter Message' type="text" />
                    <>{showSendButton && input !== "" ? <button type={`submit`} className={`btn m-2 w-25`}>Send</button> : <><div className={' icon-wrapper   pointer text-center'} onClick={handleSendMedia}></div><div className={' icon-wrapper   pointer text-center'}></div></> }</>
                </form>
                <br/>
                <br/>
                <br/>
            </>


        </>

    );
};

export default MessageWindow;