import React, {useState} from 'react';
import dummy from '../images/dummy.png'
import deposit from "../images/deposit_fund.svg";
import Icon from "./icon";
import ChatContent from "./chatContent";
import user from "../images/arrow right.svg";
import {useChat} from "../contexts/messageContext";
import MessageCard from "./messageCard";
import {pushFireStoreData, pushSubCollection} from "../helper/helper";

const MessageWindow = () => {
    const {chat,setChat ,chatRoomId,openedChat,chatName} = useChat();
    const [input,setInput] = useState('');
    const handleSendText = (event)  => {
        event.preventDefault()
        // Append message to the chat list
        setInput(event.target.message.value)

        console.log(chatRoomId)
        var data = {
            text: event.target.message.value
        }
        console.log(data)
        setInput(data)
        console.log(input)
        pushSubCollection('ChatRooms',chatRoomId,'chat', data)
        setChat( [...chat,data])

        console.log(chat)
        setInput('')

    }
    return (
        <>
            {
                openedChat
                    ?
                    <>
                        <div className='d-flex center mb-2'>
                            <div className='user-list-thumb-wrapper'>
                                <img src={dummy} alt=""/>
                            </div>
                            <div className='ml-3 text-light'>
                                <div className='space-medium'>{chatName}</div>

                            </div>


                            <div className=' chat-icon-group mr-0 ml-auto d-flex'>
                                <Icon props={{backgroundColor: '#2B3038',image: deposit} }/>
                                <Icon props={{backgroundColor: '#2B3038',image: deposit} }/>
                                <Icon props={{backgroundColor: '#2B3038',image: deposit} }/>


                            </div>


                        </div>

                        <div className='chat-container'>

                            <div className='chat-box'>
                                { chat ? chat.map(chats  =>{
                                    return(<>
                                            { chats.text ? <>
                                                <ChatContent  chats={chats} key={chats.chatId} />


                                            </> : <></>}



                                        </>
                                    )
                                }) : ''}


                            </div>


                        </div>
                        <form onSubmit={handleSendText} className=' d-flex chat-input'>


                            <input name='message' placeholder='Enter Message' type="text" style={{backgroundImage: `url(${user})`}}/>
                        </form>
                    </>
                    :
                    <div className='text-light text-center align-self-center'>
                        Select Chat
                    </div>
            }

        </>

    );
};

export default MessageWindow;