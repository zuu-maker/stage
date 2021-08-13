import React, {useEffect, useRef, useState} from 'react';
import ChatContent from "./chatContent";
import {useChat} from "../contexts/messageContext";
import {getReceiverEmail} from "../helper/helper";
import {useLoader} from "../contexts/loaderContext";
import firebase from "firebase";
import {auth, db, storage} from "../firebase/firebase";
import {Dropdown, Modal} from "react-bootstrap";
import BackButton from "./backButton";
import {useStateValue} from "../contexts/StateProvider"
import {Link, useHistory, useParams} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection, useDocumentOnce} from "react-firebase-hooks/firestore"
import DisplayName from './DisplayName';
import spinner from '../images/spinner.gif'
import {useObject} from "react-firebase-hooks/database";
import {css} from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";
import UserList from "../sections/events/userList";
import sendText from '../images/send-text.svg'
import mail from "../images/mail.svg";
function ModalPopup(props) {
  //   const override = css`
  // display: block;
  //     margin: 0 7%;`;
    let [color, setColor] = useState("#18ff00");
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={`true`}
            // className={`event-popup`}
        >
            <Modal.Header >
                <div className={`text-right text-light mr-0 ml-auto`}>
                    <span onClick={ props.onHide}>Dismiss</span>
                </div>
            </Modal.Header>

            <Modal.Body>
<div className={`sub-heading`}>
    Group Participants
</div>

                    {
                        props.participants?.map(each =>{return(
                            <UserList user={each} />
                        )})
                    }



            </Modal.Body>

        </Modal>
    );
}
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

    const [modalShow, setModalShow] = React.useState(false);
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
                    preview={previewImageOnSend}
                    loading={loading}
                    fileLoading={fileLoading}
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
                            deliveredToParticipants: [currentUser.uid],
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
                                //Update message chatId field
                                await docRef.update({chatId: docRef.id})
                                db.collection('ChatRooms').doc(params.id).update({dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp()})

                            })
                            .catch((err) => {
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
            deliveredToParticipants: [currentUser.uid],
            chatRoomId: params.id,
            dateTime: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(async docRef => {
                console.log('added')
                //Update message chatId field
                await docRef.update({chatId: docRef.id})
                db.collection('ChatRooms').doc(params.id).update({dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp()})


        setInput('')
        scrollView.current.scrollIntoView({behavior: 'smooth'})
        // setLoading(false)

    })
            .catch(e =>{
                console.log(e.message)
    })

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

    }


    // }).catch((err) => {
    //     console.log(err)
    // })
    // console.log(chatRoomObject?.users);
    // console.log(chatRoomObject?.groupChatName);

    return (
        <>
            <ModalPopup
                show={modalShow}
                participants={chatRoomObject?.participants}
                onHide={() => setModalShow(false)}
            />
            <>

                <nav className='nav navbar center  chat-header mb-2'>
                    <div className={`flex-grow-1`}>
                        <BackButton/>

                    </div>
                    <div className='flex-grow-1 lg-view user-list-thumb-wrapper'>
                        {/*<img src={chatRoomObject.userProfileImageUrl} alt=""/>*/}
                    </div>
                    <div className='text-sm-center text-lg-left text-md-left flex-grow-1 text-light guest-name'>
                        {/*{receiverEmail && <DisplayName groupName={chatRoomObject?.groupChatName} receiver={receiverEmail}/>}*/}
                        {chatRoomObject?.isGroupChat ? chatRoomObject.groupChatName  : receiverObject?.userName}

                    </div>


                    <div className='justify-content-end flex-grow-1 chat-icon-group mr-0 ml-auto d-flex'>
                        <div className={` lg-view-flex`}>

                        </div>
                        <div className={' icon-wrapper   pointer text-center'}><div onClick={() =>  setModalShow(true)} style={{color:'#18ff00'}} className={'dots-dropdown'}>&#9432;</div></div>


                        {/*<Dropdown className={`ml-2`}>*/}
                        {/*    <Dropdown.Toggle variant="" id="">*/}
                        {/*        <div className={' icon-wrapper   pointer text-center'}><div className={'dots-dropdown'}>&#9432;</div></div>*/}

                        {/*    </Dropdown.Toggle>*/}

                        {/*    <Dropdown.Menu>*/}
                        {/*        <Dropdown.Item  ><Link >Invite Participants</Link></Dropdown.Item>*/}
                        {/*        <Dropdown.Item  >Exit Group</Dropdown.Item>*/}
                        {/*        <Dropdown.Item  >Delete Group</Dropdown.Item>*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}

                    </div>




                </nav>

                <div className={`chat-container`}>
                    <br/>
                    <br/>
                    <br/>


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
                        {/*{previewImageOnSend &&*/}
                        {/*<div className={`d-flex  text-container position-relative`}>*/}
                        {/*    <img className={`spinner-loader`} width={24} style={{display: fileLoading ? 'flex': 'none'}} src={spinner} alt=""/>*/}
                        {/*    <img src={previewImageOnSend} alt=""/>*/}
                        {/*</div>*/}
                        {/*}*/}
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
                    <div className={`d-flex  text-container position-relative`}>
                        <img className={`spinner-loader`} width={24} style={{display: fileLoading ? 'flex': 'none'}} src={spinner} alt=""/>
                        <img src={preview} alt=""/>
                    </div>


                    <input value={input} onChange={(e) => {setInput(e.target.value);setShowSendButton(true)}} name='message'
                           placeholder='Enter Message' type="text" />
                    <>{showSendButton && input !== "" ? <button type={`submit`}  style={{backgroundImage: `url(${sendText})`}}className={`btn send-text-btn  m-2 `}></button> : <><div className={' icon-wrapper   pointer text-center'} onClick={handleSendMedia}></div><div className={' icon-wrapper   pointer text-center'}></div></> }</>
                </form>
                <br/>
                <br/>
                <br/>
            </>


        </>

    );
};

export default MessageWindow;