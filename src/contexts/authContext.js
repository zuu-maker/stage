import React, {useState, useEffect, useContext} from 'react'
import {auth, db} from '../firebase/firebase'
import {useUser} from "./userContext";
import {getRealtimeChild, getRealtimeDoc} from "../helper/helper";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [user,setUser] = useState([]);
    const [loading, setLoading] = useState(true)
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [createdEvents, setCreatedEvents] = useState([]);


    let userJoinedEventsList = [];
    let joinedEventsList = [];
    let createdEventsList = [];

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
             if(user){
             db.collection('Users').where('objectId', "==", user.uid)
                 .onSnapshot((snapshot) => {
                     console.log(snapshot.docs.map(doc => doc.data()))
                     setUser([])
                     const userArr  = snapshot.docs.map(doc => doc.data())
                     setUser(userArr?.find( b=>{ return b}))

                 })


                 // getRealtimeChild('Participants', 'userId', user.uid).on("child_added", function (snapshot) {
                 //     userJoinedEventsList.push(snapshot.val())
                 //
                 //
                 // })
                 //     console.log(userJoinedEventsList)
                 //     userJoinedEventsList.forEach((eventJoined) => {
                 //         // realDB.ref('Events'+'/'+eventJoined.EventId).on('value',(snapshot) =>{
                 //         //     console.log(snapshot)
                 //         //     console.log(snapshot.val())
                 //         // })
                 //         getRealtimeDoc('Events', eventJoined.EventId).then((snapshot) => {
                 //
                 //             joinedEventsList.push(snapshot.val())
                 //         })
                 //
                 //     })
                 //     console.log(joinedEventsList)
                 //
                 //     setJoinedEvents(joinedEventsList)
                 //
                 //     console.log(joinedEvents)
                 //
                 //
                 //
                 //
                 //
                 //
                 // getRealtimeChild('Events','EventCommissionerId',user.uid).get()
                 //     .then((snapshot)=>{
                 //         snapshot.forEach((doc) =>{
                 //             createdEventsList.push(doc.val())
                 //         })
                 //         setCreatedEvents(createdEventsList)
                 //         console.log(createdEventsList)
                 //         console.log(createdEvents)
                 //     })
                 //     .catch(e => {
                 //         console.log(e)})
                 //





         }


            setLoading(false)

        })
          
        return () =>{
             unsubscribe()
            console.log('auth unmounted')
         }
    }, [])

    const value = {
        currentUser,
        setCurrentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        joinedEvents, setJoinedEvents,
        user,
        createdEvents, setCreatedEvents
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
