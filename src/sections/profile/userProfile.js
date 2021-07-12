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
import {getDoc, getFirestoreDocument, getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {auth, db} from "../../firebase/firebase";
import {useUser} from "../../contexts/userContext";
import {useLoader} from "../../contexts/loaderContext";
import Sidebar from "../dashboard/sidebar";

function UserProfile() {
    const {currentUser, setCurrentUser, user} = useAuth()
    let params = useParams();
    const userId = params.id;
    const {otherUser, setOtherUser, setUser, hasFollowed, setHasFollowed} = useUser();
    const [curUser, setCurUser] = useState();
    const [joinedEvents, setJoinedEvents] = useState([]);
    const {setLoader, loader} = useLoader();
    let userJoinedEventsList = [];
    let joinedEventsList = [];


    useEffect(() => {
        {
            currentUser && currentUser.uid !== params.id &&

            setLoader(true)

            db.collection('Users').where('objectId', "==", params.id)
                .onSnapshot((snapshot) => {
                    console.log(snapshot.docs.map(doc => doc.data()))
                    setOtherUser([])
                    const userArr = snapshot.docs.map(doc => doc.data())
                    setOtherUser(userArr?.find(b => {
                        return b
                    }))

                    user.followedUsersIds?.find((follower) => {
                        if (otherUser.userId === follower) {
                            setHasFollowed(true)

                            return true;
                        } else {
                            setHasFollowed(false)
                            return false;

                        }
                    })

                });


            getRealtimeChild('Participants', 'userId', params.id).on("child_added", function (snapshot) {

                userJoinedEventsList?.push(snapshot.val())
            })

            userJoinedEventsList.forEach((eventJoined) => {
                getRealtimeDoc('Events', eventJoined.EventId).then((snapshot) => {

                    joinedEventsList?.push(snapshot.val())
                })

            })
            setJoinedEvents(joinedEventsList)

            console.log(joinedEventsList)
            console.log(joinedEvents)

            setLoader(false)

        }

    }, [])

    return (
        <>

            <Header/>

            {currentUser && currentUser.uid == params.id &&

            <div className='container user d-flex'>
                {/*<UserMenu  user={user} />*/}
                <Sidebar/>
                <Graph/>
            </div>
            }
            <>
                <div className='container other-user d-flex'>
                    <>
                        {!loader && otherUser.userId && joinedEvents  && <OtherUserMenu otherUserObj={otherUser} joinedEventsArray={joinedEvents}/>}

                    </>

                </div>

            </>
            }
            <MobileNavbar/>


        </>
    );
}

export default UserProfile;