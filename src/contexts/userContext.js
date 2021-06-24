import React, {useState, useContext} from 'react'

const UserContext = React.createContext()

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const [user,setUser] = useState([]);

    const value = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={value}>
            { children}
        </UserContext.Provider>
    )
}
