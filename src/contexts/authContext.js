import React,{useState , useContext} from 'react'
import { auth } from './firebase'
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
const [currentUser,setCurrentUse] = useState();
  function signup() {

  }
const value = {
    currentUser
}

export function AuthProvider({children}) {
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}