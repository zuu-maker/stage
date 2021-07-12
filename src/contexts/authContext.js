import React, {useState, useEffect, useContext} from 'react'
import {auth} from '../firebase/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //Sign up User
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    //Login user
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    //Logout user
    function logout() {
        return auth.signOut()
    }

    //Reset Password
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)

    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(async () => {
         const unsubscribe = await auth.onAuthStateChanged(user => {
                // User is signed in.
                setCurrentUser(user)



            setLoading(false)

        })
          
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        setCurrentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
