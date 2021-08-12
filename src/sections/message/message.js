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
import {useStateValue} from '../../contexts/StateProvider';
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from "react-firebase-hooks/firestore"

function Message() {

    const [currentUser] = useAuthState(auth)

    const [{user}] = useStateValue()
    const {show, setNotificationPopup, setShow} = useChat();
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)
    const [chatRoomArraySnap, error] = useCollection(db.collection("Users").doc(user?.uid).collection('ChatRoomIds'))
    const chatList = []

    const {setLoader, loader} = useLoader();
    let chatRoomIds = []
    let params = useParams();
    const messageId = params.id;
    const userObj = {
        email: user?.email,
        objId: user?.uid,

        userName: user?.displayName
    };


    useEffect(() => {
        {
            params.id ? setShow(true)
                :
                setShow(false)
        }

    }, [])

    useEffect(() =>{
        // chatList = []
        if(user.uid){
            db.collection("Users").doc(user.uid).collection('ChatRoomIds').get()
                .then(
                snapshot => {

                    snapshot.docs.map((each) => {

                        // chatRoomIds.push(each.data())
                        db.collection('ChatRooms').where("chatRoomId", "==", each.data().id).orderBy('dateLastUpdated','desc').onSnapshot(snapshot => {
                            snapshot.docs.forEach(doc => {
                                chats.push(doc.data())
                                console.log(doc.data())
                            })

                            // setChats(chatList)
                            setLoading(false)





                            // snapshot.docChanges().forEach((change) => {
                            //                            if (change.type === "added") {
                            //                                console.log("New : ", change.doc.data());
                            //                                chatList.push(change.doc.data())
                            //
                            //                            }
                            //                            if (change.type === "modified") {
                            //                                console.log("Modified : ", change.doc.data());
                            //                                setNotificationPopup(change.doc.data())
                            //
                            //                            }
                            //                            if (change.type === "removed") {
                            //                                console.log("Removed : ", change.doc.data());
                            //                            }
                            //                        })


                        })

                    })
                    console.log(chatRoomIds)
                    // chatRoomIds?.map((each) => {
                    //     db.collection('ChatRooms').where("chatRoomId", "==", each.id).orderBy('dateLastUpdated','desc').onSnapshot(snapshot => {
                    //         snapshot.docs.forEach(doc => {
                    //             chatList.push(doc.data())
                    //             console.log(doc.data())
                    //         })
                    //
                    //         setChats(chatList)
                    //         setLoading(false)
                    //
                    //
                    //
                    //
                    //
                    //         // snapshot.docChanges().forEach((change) => {
                    //         //                            if (change.type === "added") {
                    //         //                                console.log("New : ", change.doc.data());
                    //         //                                chatList.push(change.doc.data())
                    //         //
                    //         //                            }
                    //         //                            if (change.type === "modified") {
                    //         //                                console.log("Modified : ", change.doc.data());
                    //         //                                setNotificationPopup(change.doc.data())
                    //         //
                    //         //                            }
                    //         //                            if (change.type === "removed") {
                    //         //                                console.log("Removed : ", change.doc.data());
                    //         //                            }
                    //         //                        })
                    //
                    //
                    //     })
                    // })
                }

            )


            console.log(chatList)
            // if (chatRoomArraySnap) {
            //
            //     chatRoomArraySnap.docs.map((each) => {
            //         chatRoomIds.push(each.data())
            //     })
            //     // chatList=[]
            //     // setChats([])
            //
            //     chatRoomIds.map((each) => {
            //         db.collection('ChatRooms').where("chatRoomId", "==", each.id).orderBy('dateLastUpdated','desc').onSnapshot(snapshot => {
            //             snapshot.docs.forEach(doc => {
            //                 chatList.push(doc.data())
            //             })
            //
            //
            //
            //
            //
            //
            //             // snapshot.docChanges().forEach((change) => {
            //             //                            if (change.type === "added") {
            //             //                                console.log("New : ", change.doc.data());
            //             //                                chatList.push(change.doc.data())
            //             //
            //             //                            }
            //             //                            if (change.type === "modified") {
            //             //                                console.log("Modified : ", change.doc.data());
            //             //                                setNotificationPopup(change.doc.data())
            //             //
            //             //                            }
            //             //                            if (change.type === "removed") {
            //             //                                console.log("Removed : ", change.doc.data());
            //             //                            }
            //             //                        })
            //
            //
            //         })
            //     })
            //     setChats(chatList)
            //     console.log(chatList)
            //
            // }
        }

    },[user?.uid])
    const checkName = (name, str) => {
        var pattern = str.split("").map((x)=>{
            return `(?=.*${x})`
        }).join("");
        var regex = new RegExp(`${pattern}`, "g")
        return name.match(regex);
    }
    const handleSearchChat = (e) =>{
        var str = e.target.value.toLowerCase().substring(0, 3)
        console.log(str)
        var filteredArr = chats?.filter((x)=>{
            var xSub = x.substring(0, 3).toLowerCase()
            return x.toLowerCase().includes(str) || checkName(xSub, str)
        })
        if (filteredArr.length > 0){
            console.log(filteredArr)
        } else {
            console.log("no results")
        }
    }
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
                                    <div className={`d-flex align-items-center`}>
                                        <Search  functionHandler={handleSearchChat} props={'#13161A'}/>
                                        <CreateGroupBtn/>
                                    </div>

                                </div>
                                <div className='user-list'>
                                    {!loading && chats ? chats.map(chat => {
                                        // console.log(chat.data());
                                        return (<>

                                                <MessageCard  key={chat.chatRoomId}
                                                              id={chat.chatRoomId} chats={chat}/>


                                            </>
                                        )
                                    }) : <></>}

                                </div>


                            </div>


                        </div>
                        {
                            !show ? <>
                                    <div className='sm-view   w-100 pl-3 pr-3 '>
                                        <div className=' w-100  d-flex justify-content-center  pt-4'>
                                            <div className='flex-grow-1'>
                                                <h4 className='text-light'>Messages</h4>
                                                <p>Talk with your friends</p>


                                            </div>

                                            <div className="search-container flex-grow-1 ">
                                                <div className='search  d-flex float-right'>
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
                                                {!loading && chats !== undefined && chats !== null && chats ? chats.map(chat => {
                                                    // console.log(chat.data());
                                                    return (<>

                                                            <MessageCard  key={chat.chatRoomId}
                                                                         id={chat.chatRoomId} chats={chat}/>


                                                        </>
                                                    )
                                                }) : <></>}
                                            </div>


                                        </div>


                                    </div>

                                </>
                                :
                                <>
                                    <div className='col-md-8 p-0 col-lg-8 col-sm-12'>
                                        {
                                            messageId && currentUser.email && <MessageWindow/>

                                        }

                                    </div>

                                </>
                        }
                    </div>
                </div>
            </div>
            {!show && <MobileNavbar/>}
        </>

    );
}

export default Message;


