import React, {useEffect, useState} from 'react';
import {CreateEventBtn, CreateGroupBtn} from "../modal/modal";
import Search from "../search/search";
import MessageCard from "../../components/messageCard";
import MobileNavbar from "../../components/mobileNavbar";
import Header from "../header/header";
import MessageWindow from "../../components/messageWindow";
import '../message/message.css'
import {getDoc, getOptions, getRealtimeCollection, getSubCollection} from "../../helper/helper";
import UserList from "../events/userList";
import {auth, db} from "../../firebase/firebase";
import {ChatProvider, useChat} from "../../contexts/messageContext";
import {useLoader} from "../../contexts/loaderContext";
import Graph from "../profile/graph";
import Card from "../events/card";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/authContext";
import CreateGroup from "../../components/createGroup";
import { useStateValue } from '../../contexts/StateProvider';
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from "react-firebase-hooks/firestore"

function Message() {

    //new lines
    const [currentUser] = useAuthState(auth)

     const [{user}] = useStateValue()
    const {chatRoom,show,notificationPopup,setNotificationPopup,setShow,chatList, setChatList} = useChat();
    const [chats,setChats] = useState([])
    const [chatSnap,loading,error] = useCollection(db.collection("Recent").where("members", "array-contains", currentUser.uid).orderBy('date','desc'))

    const {setLoader,loader} = useLoader();
    let params = useParams();
    const messageId = params.id;
    const userObj = {
        email: user?.email,
        objId: user?.uid,

        userName: user?.displayName
    };



    
    useEffect(async () => {
        { params.id ? setShow(true)
            :
            setShow(false)
        }

    if(chatSnap){
        const unsubscribe = chatSnap.docChanges().forEach((change) => {
                           if (change.type === "added") {
                               // console.log("New : ", change.doc.data());

                           }
                           if (change.type === "modified") {
                               // console.log("Modified : ", change.doc.data());
                               setNotificationPopup(change.doc.data())

                           }
                           if (change.type === "removed") {
                               console.log("Removed : ", change.doc.data());
                           }
                       })
               // }
        // {messageId ? setOpenedChat(true): setOpenedChat(false)}
        return () => {
            // Unmouting
            unsubscribe();
        };
    }
    }, [chatSnap])


    return (
<>


            <Header/>
    { chats && <div className='container'>


        <div className='message '>
            <div className='row'>
                <div className='col-md-4 col-lg-4 col-sm-12 lg-view'>
                    <div className=' pt-3 user-list-section'>
                        <div className='lg-view'>
                            <h5 className='text-light ml-5 mb-5`'>Messages</h5>
                            <div className={`d-flex align-items-center`}>
                                <Search props={'#13161A'}/>
                                <CreateGroupBtn/>
                            </div>

                        </div>
                        <div className='user-list'>
                            { !loading && chatSnap ? chatSnap.docs.map(chat => {
                                // console.log(chat.data());
                                 console.warn(chat.data().members)
                                return (<>

                                       {(chat.data().chatRoomID && chat.data().members) && <MessageCard uid={currentUser.uid} key={chat.data().chatRoomID} id={chat.data().chatRoomID} chats={chat.data()}/> }


                                    </>
                                )
                            }) : 'No Chats Available'}

                        </div>


                    </div>


                </div>
                {
                    !show ? <>
                            <div className='sm-view mx-auto  '>
                                <div className='  d-flex justify-content-center align-items-center pt-4'>
                                    <div className='flex-grow-1'>
                                        <h4 className='text-light'>Messages</h4>
                                        <p>Talk with your friends</p>


                                    </div>

                                    <div className="search-container flex-grow-1 ">
                                        <div className='search d-flex float-right'>
                                            <CreateGroupBtn/>
                                        </div>


                                    </div>

                                </div>
                                <Search/>


                            </div>

                            <div className='col-md-4 col-lg-4 col-sm-12 sm-view'>
                                <div className=' pt-3 user-list-section'>
                                    <div className='lg-view'>
                                        <h5 className='text-light ml-5 mb-5`'>Messages</h5>
                                        <div className={`d-flex align-items-center`}>
                                            <Search props={'#13161A'}/>
                                            <CreateGroupBtn/>
                                        </div>


                                    </div>
                                    <div className='user-list'>
                                        { !loading && chatSnap ? chatSnap.docs.map(chat => {
                                            // console.log(chat.data());
                                            console.warn(chat.data().members)
                                            return (<>

                                                    {(chat.data().chatRoomID && chat.data().members) && <MessageCard uid={currentUser.uid} key={chat.data().chatRoomID} id={chat.data().chatRoomID} chats={chat.data()}/> }


                                                </>
                                            )
                                        }) : 'No Chats Available'}
                                    </div>


                                </div>


                            </div>

                        </>
                        :
                        <>
                            <div className='col-md-8 p-0 col-lg-8 col-sm-12'>
                                {
                                    messageId && currentUser.email && <MessageWindow />

                                }

                            </div>

                        </>
                }
            </div>
        </div>
    </div>}
    {!show && <MobileNavbar/>}
</>

    );
}

export default Message;


 