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

    // const userChatRef = db.collection("Recent").where('members',"array-contains",currentUser?.uid)

    const chatRef = db.collection("Recent").where('members',"array-contains","YbDgZU6l83YmhwsBY9iIwEOqB4f2").orderBy('date','asc')
  
     const [{user}] = useStateValue()
    // const {currentUser} = useAuth();
    const [loading,setLoading] = useState(false);
    const {chatRoom,show,setShow,chatList, setChatList} = useChat();
    const recentChats = [];
    const modifiedList =[]
    // setChatList([])
    const [chats,setChats] = useState([])
    // console.log(chatsSnap?.docs);

    const {setLoader,loader} = useLoader();
    let params = useParams();
    const messageId = params.id;
    const userObj = {
        email: user?.email,
        objId: user?.uid,

        userName: user?.displayName
    };
    const [chatsSnap] = useCollection(chatRef)
    console.log(chatsSnap);

    
    useEffect(async () => {
        { params.id ? setShow(true)
            :
            setShow(false)
        }
        // {messageId ? setOpenedChat(true): setOpenedChat(false)}
        setLoading(true)

         await db.collection("Recent").where("members", "array-contains", currentUser.uid).orderBy('date','desc')
            .onSnapshot(
                (snapshot) => {

                    setChats(snapshot.docs.map(doc =>doc.data() ))
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            console.log("New : ", change.doc.data());

                        }
                        if (change.type === "modified") {
                            console.log("Modified : ", change.doc.data());
                            modifiedList.push(change.doc.data())
                            console.log(modifiedList)
                        }
                        if (change.type === "removed") {
                            console.log("Removed : ", change.doc.data());
                        }
                    })
                })

                // snapshot => {
                // setChatList([])
                // setChatList(snapshot.docs.map(doc =>doc.data() ))
                // console.log(chatList)

                // snapshot.docChanges().forEach(change => {
                //     if (change.type === "added") {
                //
                //
                //         console.log(change.doc.data())
                //     }
                //     if (change.type === "modified") {
                //         recentChats.push(change.doc.data())
                //         console.log(change.doc.data())
                //     }
                //     if (change.type === "removed") {
                //         recentChats.push(change.doc.data())
                //     }
                // } )
            // })




        // db.collection('ChatRooms').orderBy('dateLastUpdated','desc').onSnapshot(snapshot => {
        //
        //
        //     setChatList(snapshot.docs.map(doc =>doc.data()))
        //
        //
        // })


        // setChatList(await getRealtimeCollection('ChatRooms'))
        // setChatList(x)
        setLoading(false)

    }, [])

    useEffect(async () => {
        { params.id ? setShow(true)
            :
            setShow(false)
        }
        // {messageId ? setOpenedChat(true): setOpenedChat(false)}
        setLoading(true)

        //  db.collection("Recent").where("members", "array-contains", user?.uid).orderBy('date','desc')
        //     .onSnapshot(
        //         (snapshot) => {
        //             setChatList([])

        //             setChatList(snapshot.docs.map(doc =>doc.data() ))
        //             snapshot.docChanges().forEach((change) => {
        //                 if (change.type === "added") {
        //                     console.log("New : ", change.doc.data());

        //                 }
        //                 if (change.type === "modified") {
        //                     console.log("Modified : ", change.doc.data());
        //                     modifiedList.push(change.doc.data())
        //                     console.log(modifiedList)
        //                 }
        //                 if (change.type === "removed") {
        //                     console.log("Removed : ", change.doc.data());
        //                 }
        //             })
        //         })

                // snapshot => {
                // setChatList([])
                // setChatList(snapshot.docs.map(doc =>doc.data() ))
                // console.log(chatList)

                // snapshot.docChanges().forEach(change => {
                //     if (change.type === "added") {
                //
                //
                //         console.log(change.doc.data())
                //     }
                //     if (change.type === "modified") {
                //         recentChats.push(change.doc.data())
                //         console.log(change.doc.data())
                //     }
                //     if (change.type === "removed") {
                //         recentChats.push(change.doc.data())
                //     }
                // } )
            // })




        // db.collection('ChatRooms').orderBy('dateLastUpdated','desc').onSnapshot(snapshot => {
        //
        //
        //     setChatList(snapshot.docs.map(doc =>doc.data()))
        //
        //
        // })


        // setChatList(await getRealtimeCollection('ChatRooms'))
        // setChatList(x)
        setLoading(false)

    }, [])
    // const routes =[]
    //  chatList.forEach((chat)=>{
    //
    //      routes.push([{
    //          path: `/messages/${chat.chatRoomId}`,
    //          exact: true,
    //          dashboard: () => <></>,
    //
    //          main: () =><MessageWindow />
    //      }])
    //
    // })

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
                            { chats ? chats?.map(chat => {
                                // console.log(chat.data());
                                 console.warn(chat.members) 
                                return (<>

                                       {(chat.chatRoomID && chat.members) && <MessageCard uid={currentUser.uid} key={chat.chatRoomID} id={chat.chatRoomID} data={chat}/> } 


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
                                        {chats ? chats.map(chats => {
                                            return (<>

                                                    <MessageCard data={chats} id={chats.id} key={chats.chatRoomID} />


                                                </>
                                            )
                                        }) : 'No Chats Available'}

                                    </div>


                                </div>


                            </div>

                        </>
                        :
                        <>
                            <div className='col-md-8 col-lg-8 col-sm-12'>
                                {
                                    messageId && currentUser.email && <MessageWindow />

                                }

                            </div>

                        </>
                }
            </div>
        </div>
    </div>}
            <MobileNavbar/>
</>

    );
}

export default Message;


 