import React, {useState, useContext} from 'react'

const ChatContext = React.createContext()

export function useChat() {
    return useContext(ChatContext)
}

export function ChatProvider({ children }) {
    const [chat,setChat] = useState([]);
    const [openedChat,setOpenedChat] = useState(false);
    const [chatName,setChatName] = useState('');
    const [chatRoomId,setChatRoomId] = useState('');

    const value = {
        chat,
        setChat,
        openedChat,
        setOpenedChat,
        chatName,
        setChatName,
        chatRoomId,
        setChatRoomId

    }

    return (
        <ChatContext.Provider value={value}>
            { children}
        </ChatContext.Provider>
    )
}
