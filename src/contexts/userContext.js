import React, {useState, useContext} from 'react'

const UserContext = React.createContext()

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const [user,setUser] = useState([]);
    const [otherUser,setOtherUser] = useState([]);
    const [hasJoined,setHasJoined] = useState(false);

    const value = {
        user,
        setUser,
        otherUser,
        setOtherUser,
        hasJoined,
        setHasJoined
    }

    return (
        <UserContext.Provider value={value}>
            { children}
        </UserContext.Provider>
    )
}
