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
    const {show, setShow} = useChat();
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)

    let params = useParams();
    const messageId = params.id;



    useEffect(() => {
        {
            params.id ? setShow(true)
                :
                setShow(false)
        }

    }, [])

    useEffect(() => {
        if (user.uid) {
            db.collection("Users")
                .doc(user.uid)
                .collection("ChatRoomIds")
                .get()
                .then((snapshot) => {
                    snapshot.docs.map((each) => {
                        db.collection("ChatRooms")
                            .where("chatRoomId", "==", each.data().id)
                            .orderBy("dateLastUpdated", "desc")
                            .onSnapshot((snapshot) => {
                                console.log(snapshot.docs.map((doc) => doc.data()))
                                setChats((chats) =>
                                    chats.concat(snapshot.docs.map((doc) => doc.data()))
                                );
                                setLoading(false)
                            });
                    });
                });
        }
    }, []);
    const checkName = (name, str) => {
        var pattern = str.split("").map((x) => {
            return `(?=.*${x})`
        }).join("");
        var regex = new RegExp(`${pattern}`, "g")
        return name.match(regex);
    }
    const handleSearchChat = (e) => {
        var str = e.target.value.toLowerCase().substring(0, 3)


        var filteredArr = chats?.filter((x) => {

            var xSub = x.groupChatName.substring(0, 3).toLowerCase()
            return x.groupChatName.toLowerCase().includes(str) || checkName(xSub, str)
        })
        var b = chats?.map(each => {
            var filteredPrivateChat = each.participants.filter((x) => {

                var xSub = x.userName.substring(0, 3).toLowerCase()

                return x.userName.toLowerCase().includes(str) || checkName(xSub, str)
            })
            console.log(filteredPrivateChat)
            console.log(b)
        })

        if (filteredArr?.length > 0) {
            setChats(filteredArr)
            console.log(filteredArr)

        } else {


            console.log("no matches found")
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
                                        <Search functionHandler={handleSearchChat} props={'#13161A'}/>
                                        <CreateGroupBtn/>
                                    </div>

                                </div>
                                <div className='user-list'>
                                    {/*{!loading && chats ? chats.map(chat => {*/}
                                    {/*    // console.log(chat.data());*/}
                                    {/*    return (<>*/}

                                    {/*            <MessageCard key={chat.chatRoomId}*/}
                                    {/*                         id={chat.chatRoomId} chats={chat}/>*/}


                                    {/*        </>*/}
                                    {/*    )*/}
                                    {/*}) : <></>}*/}

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
                                        <Search functionHandler={handleSearchChat}/>


                                    </div>

                                    <div className='col-md-4 col-lg-4 col-sm-12 sm-view'>
                                        <div className=' pt-3 user-list-section'>
                                            <div className='lg-view'>
                                                <h5 className='text-light ml-5 mb-5`'>Messages</h5>
                                                <div className={`d-flex align-items-center`}>
                                                    <Search functionHandler={handleSearchChat} props={'#13161A'}/>
                                                    <CreateGroupBtn/>
                                                </div>


                                            </div>
                                            <div className='user-list'>
                                                {!loading && chats ? chats.map(chat => {

                                                    return (<>

                                                            <MessageCard key={chat.chatRoomId}
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


