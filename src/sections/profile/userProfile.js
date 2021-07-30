import React, {useEffect, useState} from 'react';
import './userProfile.css'
import Header from "../header/header";
import EventSection from "../events/eventSection";
import UserList from "../events/userList";
import Graph from "./graph";
import Card from "../events/card";
import UserMenu from "./userMenu";
import basketball from "../../images/basketball.png";
import dummy from "../../images/dummy.png";
import MobileNavbar from "../../components/mobileNavbar";
import {useAuth} from "../../contexts/authContext";
import {useParams} from "react-router-dom";
import OtherUserMenu from "./otherUserMenu";
import {
    getDoc, getDocWithRef,
    getFirestoreDocument,
    getRealtimeChild,
    getRealtimeCollection,
    getRealtimeDoc
} from "../../helper/helper";
import {auth, db, realDB} from "../../firebase/firebase";
import {useUser} from "../../contexts/userContext";
import {useLoader} from "../../contexts/loaderContext";
import Sidebar from "../dashboard/sidebar";
import { useStateValue } from '../../contexts/StateProvider';
import {useAuthState} from "react-firebase-hooks/auth"

function UserProfile() {
    const [currentUser] = useAuthState(auth)
    const [{user,userData,otherUser},dispatch] = useStateValue();
    // const {currentUser, user} = useAuth()
    let params = useParams();
    // const {otherUser, setOtherUser, setHasFollowed} = useUser();
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setLoader, loader} = useLoader();
    let userJoinedEventsList = [];
    let joinedEventsList = [];


    useEffect(() => {

        //Get other user object from firestore User collection
            if(userData && user.uid !== params.id ){
            setLoader(true)


            db.collection('Users').where('objectId', "==", params.id)
                // .get()
                .onSnapshot((snapshot) => {
                    console.log(snapshot.docs.map(doc => doc.data()))
                    const otherUser =  snapshot.docs.map(doc => doc.data()).find(b => {return b})
                    dispatch({
                        type:"SET_OTHER_USER",
                        otherUser,
                    })
                    console.log(otherUser)
                    // setOtherUser(snapshot.docs.map(doc => doc.data()).find(b => {return b}))

                    // user.followedUsersIds?.find((follower) => {
                    //     if (otherUser.userId === follower) {
                    //         setHasFollowed(true)
                    //
                    //         return true;
                    //     } else {
                    //         setHasFollowed(false)
                    //         return false;
                    //
                    //     }
                    // })

                });
                setLoader(false)

            return () =>{
                console.log('other user unmounted')
            }
            }

            else{
                setLoading(true)
                //Get an array of participants that match the current user Id

                    getRealtimeChild('Participants', 'userId', user?.uid).get()
                    .then((snapshot) => {
                        snapshot.forEach((doc) => {
                            userJoinedEventsList.push(doc.val())
                        })

                        //Get an array of Events in the participants array
                        userJoinedEventsList?.map((eventJoined) => {
                            getDocWithRef('Events', eventJoined.EventId)
                                .get()
                                .then((snapshot) => {
                                    joinedEventsList.push(Object.assign(snapshot.val(),{id:snapshot.key}))
                                    console.log(snapshot.val())

                                    setJoinedEvents(joinedEventsList)

                                    setLoading(false)

                                })


                                .catch(e => {
                                    console.log(e)
                                    setLoading(false)
                                })

                        })

                    })
                    .catch(e => {
                        console.log(e)
                        setLoading(false)
                    })
                // Filter out events created by the current user
                joinedEventsList.filter((eachEvent) => {
                    if (eachEvent.EventCommissionerId != currentUser.uid)
                        return eachEvent})

                //Get future events based on current time compared to the EventStartDate field
                realDB.ref('Events').orderByChild('EventStartDate').startAt(parseInt( Date.now())).get()
                    .then(snapshot =>{
                            snapshot.forEach(doc =>{
                                // console.log(doc.val())
                            })
                        })
        }
    }, [])



    return (
        <>

            <Header/>
<>

    { !loader && <>
        {user && user.uid == params.id ?

            <div className='container user d-flex'>
                {/* <UserMenu  user={user} /> */}
                <Sidebar/>
                <div className={`lg-view flex-column`}>
                    <Graph/>
                    <h4 className={`text-light`}>Joined Events</h4>
                    <div className='grid-container w-100'>




                        {!loading &&  joinedEvents?.length > 0 ? joinedEvents?.slice(0,2).map(event => {
                            return (
                                <>

                                    {event !== undefined && event !== null && <Card event={event} key={event?.id}/>}
                                </>
                            )
                        }) :<>
                            <p className={`mx-auto text-center justify-content-center align-items-center text-light`}>{!loading &&'No recent activity'}</p></> }
                    </div>

                </div>

            </div>
            :
            <>
                <div className='container other-user d-flex'>
                    <>
                        {!loader && user.uid && otherUser?.userId && <OtherUserMenu otherUserObj={otherUser}/>}

                    </>

                </div>

            </>}
    </>}
            <MobileNavbar/>

</>
        </>
    );
}


export default UserProfile;