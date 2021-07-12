import React, {useState, useContext} from 'react'

const ChatContext = React.createContext()

export function useChat() {
    return useContext(ChatContext)
}

export function ChatProvider({ children }) {
    const [chat,setChat] = useState([]);
    const [openedChat,setOpenedChat] = useState(false);
    const [sendMessage,setSendMessage] = useState('');
    const [chatName,setChatName] = useState('');
    const [chatRoomId,setChatRoomId] = useState('');
    const [chatRoom,setChatRoom] = useState('');
    const [recent,setRecent] = useState();
    const [chatList, setChatList] = useState([]);

    const [counter,setCounter] = useState(0);
    const [show,setShow] = useState(false);
    const [participants,setParticipants] = useState([]);


    const value = {
        chat,
        setChat,
        openedChat,
        setOpenedChat,
        chatName,
        setChatName,
        chatRoomId,
        setChatRoomId,
        sendMessage,setSendMessage,
        chatRoom,setChatRoom,
        recent,setRecent,
        counter,setCounter,
        show,setShow,
        participants,setParticipants,
        chatList, setChatList

    }

    return (
        <ChatContext.Provider value={value}>
            { children}
        </ChatContext.Provider>
    )
}