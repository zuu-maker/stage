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
import {db} from "../../firebase/firebase";
import {ChatProvider, useChat} from "../../contexts/messageContext";
import {useLoader} from "../../contexts/loaderContext";
import Graph from "../profile/graph";
import Card from "../events/card";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/authContext";
import CreateGroup from "../../components/createGroup";

function Message(props) {
    const {currentUser} = useAuth();
    const {chatRoom,show,setShow,chatList, setChatList} = useChat();
    const recentChats = [];


    const {setLoader} = useLoader();
    let params = useParams();
    var messageId = params.id;
    const userObj = {
        email: currentUser.email,
        objId: currentUser.uid,

        userName: currentUser.displayName
    };


    useEffect(async () => {
        { params.id ? setShow(true)
            :
            setShow(false)
        }
        // {messageId ? setOpenedChat(true): setOpenedChat(false)}
        setLoader(true)

         await db.collection("Recent").where("members", "array-contains", currentUser.uid).orderBy('date','desc')
            .onSnapshot(snapshot => {
                setChatList([])
                setChatList(snapshot.docs.map(doc =>doc.data() ))
                console.log(chatList)

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
            })




        // db.collection('ChatRooms').orderBy('dateLastUpdated','desc').onSnapshot(snapshot => {
        //
        //
        //     setChatList(snapshot.docs.map(doc =>doc.data()))
        //
        //
        // })


        // setChatList(await getRealtimeCollection('ChatRooms'))
        // setChatList(x)
        setLoader(false)

    }, [])
    // const routes =[]
    //  chatList.forEach((chat)=>{
    //
    //      routes.push([{
    //          path: `/messages/${chat.chatRoomId}`,
    //          exact: true,
    //          sidebar: () => <></>,
    //
    //          main: () =><MessageWindow />
    //      }])
    //
    // })

    return (
<>


            <Header/>
            <div className='container'>


                <div className='message '>
                    <div className='row'>
                        <div className='col-md-4 col-lg-4 col-sm-12 lg-view'>
                            <div className=' pt-3 user-list-section'>
                                <div className='lg-view'>
                                    <h5 className='text-light ml-5 mb-5`'>Messages</h5>
                                    <Search props={'#13161A'}/>
                                    <CreateGroupBtn/>


                                </div>
                                <div className='user-list'>
                                    {chatList ? chatList.map(chats => {
                                        return (<>

                                                <MessageCard chats={chats} key={chats.chatRoomId}/>


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
                                                    <CreateEventBtn/>
                                                </div>


                                            </div>

                                        </div>
                                        <Search/>


                                    </div>

                                <div className='col-md-4 col-lg-4 col-sm-12 sm-view'>
                                    <div className=' pt-3 user-list-section'>
                                        <div className='lg-view'>
                                            <h5 className='text-light ml-5 mb-5`'>Messages</h5>
                                            <Search props={'#13161A'}/>

                                        </div>
                                        <div className='user-list'>
                                            {chatList ? chatList.map(chats => {
                                                return (<>

                                                        <MessageCard chats={chats} key={chats.chatRoomId}/>


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
                                            messageId && <MessageWindow />

                                        }

                                    </div>

                                </>
                        }
                    </div>
                </div>
            </div>
            <MobileNavbar/>
</>

    );
}

export default Message;