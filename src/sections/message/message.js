import React, {useEffect, useState} from 'react';
import {CreateEventBtn} from "../modal/modal";
import Search from "../search/search";
import MessageCard from "../../components/messageCard";
import MobileNavbar from "../../components/mobileNavbar";
import Header from "../header/header";
import MessageWindow from "../../components/messageWindow";
import '../message/message.css'
import {getDoc, getOptions, getSubCollection} from "../../helper/helper";
import UserList from "../events/userList";
import {db} from "../../firebase/firebase";
import {ChatProvider, useChat} from "../../contexts/messageContext";
import {useLoader} from "../../contexts/loaderContext";

function Message(props) {
    const [chatList,setChatList] = useState([]);
    const {setLoader} = useLoader();

    
    useEffect( async () =>{
        setLoader(true)
        setChatList(await getOptions('ChatRooms'))
        setLoader(false)
        console.log(chatList)
    },[])
    return (

            <ChatProvider >
            <Header />
            <div className='container'>


            <div className='message p-3'>
                <div className='sm-view '>
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
                <div className='row'>
                    <div className='col-4'>
                        <div className=' pt-3 user-list-section'>
                            <div className='lg-view'>
                                <h5 className='text-light ml-5 mb-5`'>Messages</h5>
                                <Search props={'#13161A'} />

                            </div>
                            <div className='user-list'>
                        { chatList ? chatList.map(chats  =>{
                            return(<>

                                    <MessageCard  chats={chats} key={chats.chatRoomId} />


                                </>
                            )
                        }) : 'No Chats Available'}

                            </div>


                        </div>


                    </div>
                    <div className='col-8'>
                        <MessageWindow />

                    </div>
                </div>
            </div>
            </div>
            <MobileNavbar/>
            </ChatProvider>


);
}

export default Message;