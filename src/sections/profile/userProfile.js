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

function UserProfile() {
    const {currentUser,setCurrentUser}  = useAuth()
    let params = useParams();
    const userId = params.id;
    const {user, setUser,hasFollowed,setHasFollowed} = useUser();
    const [curUser,setCurUser] = useState();
    const {joinedEvents, setJoinedEvents} = useUser();
    const {setLoader} = useLoader();
    let userJoinedEventsList = [];
    let joinedEventsList = [];





    return (
        <>

            <Header/>

                {currentUser && currentUser.uid == params.id
                    ?
                    <div className='container user d-flex'>
                        <UserMenu  user={user} />
                    </div>
                    :
                    <>
                    <div className='container other-user d-flex'>

                    <OtherUserMenu />
                    </div>

                    </> }
                <MobileNavbar />




        </>
    );
}

export default UserProfile;