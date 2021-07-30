import React, {useState, useContext, useEffect} from 'react'
import {useCollection} from "react-firebase-hooks/firestore";
import {auth, db} from "../firebase/firebase";
import {useStateValue} from "./StateProvider";
import {useAuthState} from "react-firebase-hooks/auth";

const ChatContext = React.createContext()

export function useChat() {
    return useContext(ChatContext)
}

export function ChatProvider({ children }) {
    const [{user}] = useStateValue()
    const [currentUser] = useAuthState(auth)

    const [chat,setChat] = useState([]);
    const [openedChat,setOpenedChat] = useState(false);
    const [sendMessage,setSendMessage] = useState('');
    const [chatName,setChatName] = useState('');
    const [chatRoomId,setChatRoomId] = useState('');
    const [chatRoom,setChatRoom] = useState('');
    const [recent,setRecent] = useState();
    const [chatList, setChatList] = useState([]);
    const [totalNotificationCount,setTotalNotificationCount] = useState(0)
    const [notificationPopup,setNotificationPopup] = useState()
    // const [chatSnap] = useCollection(db.collection("Recent").where("members", "array-contains", currentUser.uid).orderBy('date','desc'))

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
        chatList, setChatList,
        totalNotificationCount,setTotalNotificationCount,
        notificationPopup,setNotificationPopup,
        // chatSnap
    }
    useEffect(() =>{
        alert(notificationPopup?.lastMessage)
    },[notificationPopup])

    return (
        <ChatContext.Provider value={value}>
            { children}
        </ChatContext.Provider>
    )
}
