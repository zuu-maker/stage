import React, {useState, useContext, useEffect} from 'react'
import {auth, db, realDB} from "../firebase/firebase";
import {getRealtimeChild, getRealtimeDoc} from "../helper/helper";
import {useLoader} from "./loaderContext";
import {useParams} from "react-router-dom";
import {useAuth} from "./authContext";

const UserContext = React.createContext()

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const [user,setUser] = useState([]);
    const [otherUser,setOtherUser] = useState([]);
    const {currentUser} = useAuth();
    const [loading,setLoading] = useState(false);
    const [hasJoined,setHasJoined] = useState(false);
    const [hasFollowed,setHasFollowed] = useState(false);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [createdEvents, setCreatedEvents] = useState([]);
    let params = useParams();

    let userJoinedEventsList = [];
    let joinedEventsList = [];
    let createdEventsList = [];

   //  useEffect(   () => {
   //      console.log('mounted')
   // const unsubscribe =  db.collection('Users').where('objectId', "==", currentUser.uid)
   //          .onSnapshot((snapshot) => {
   //              setUser([])
   //              const userArr  = snapshot.docs.map(doc => doc.data())
   //              setUser(userArr?.find( b=>{ return b}))
   //
   //          })
   //
   //      return unsubscribe
   //
   //
   //  },[])
   //  useEffect(    () => {
   //      {currentUser &&
   //    getRealtimeChild('Participants', 'userId', currentUser.uid).on("child_added", function (snapshot) {
   //     userJoinedEventsList.push(snapshot.val())
   //
   //
   //    })
   //      console.log(userJoinedEventsList)
   //      userJoinedEventsList.forEach((eventJoined) => {
   //          // realDB.ref('Events'+'/'+eventJoined.EventId).on('value',(snapshot) =>{
   //          //     console.log(snapshot)
   //          //     console.log(snapshot.val())
   //          // })
   //          getRealtimeDoc('Events', eventJoined.EventId).then((snapshot) => {
   //
   //              joinedEventsList.push(snapshot.val())
   //          })
   //
   //      })
   //      console.log(joinedEventsList)
   //
   //      setJoinedEvents(joinedEventsList)
   //
   //      console.log(joinedEvents)
   //
   //
   //
   //
   //
   //
   //
   //
   //
   //
   //
   //
   //      }
   //
   //
   //  },[])
   //  useEffect(   () => {
   //      { currentUser &&
   //       getRealtimeChild('Events','EventCommissionerId',currentUser.uid).get()
   //          .then((snapshot)=>{
   //              snapshot.forEach((doc) =>{
   //                  createdEventsList.push(doc.val())
   //              })
   //              setCreatedEvents(createdEventsList)
   //              console.log(createdEventsList)
   //              console.log(createdEvents)
   //          })
   //          .catch(e => {
   //              console.log(e)})
   //      setLoading(false)
   //
   //      }
   //
   //  },[])

    const value = {
        user,
        setUser,
        otherUser,
        setOtherUser,
        hasJoined,
        setHasJoined,
        hasFollowed,setHasFollowed,
        joinedEvents, setJoinedEvents,
        createdEvents, setCreatedEvents
    }

    return (
        <UserContext.Provider value={value}>
            { !loading && children}
        </UserContext.Provider>
    )
}
