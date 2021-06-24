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
import {getDoc, getRealtimeDoc} from "../../helper/helper";
import {auth, db} from "../../firebase/firebase";
import {useUser} from "../../contexts/userContext";

function UserProfile() {
    const {currentUser,setCurrentUser}  = useAuth()
    let params = useParams();
    const userId = params.id;
    const {user, setUser} = useUser();
    const [curUser,setCurUser] = useState();

    useEffect( async () => {

         await getRealtimeDoc('Users', params.id).then(function (snapshot) {
            const data = snapshot.val();
            // console.log(data)
             setUser(data)

        });
        // await auth.onAuthStateChanged(user => {
        //     // User is signed in.
        //      db.collection('Users').where('email', "==", user.email).get()
        //         .then((snapshot) => {
        //             snapshot.forEach(doc => {
        //                 const data = doc.data()
        //                 setUser(data)
        //                 console.log(user)
        //
        //
        //             })
        //
        //         })
        //
        //
        //
        //
        // })
        //
        // return unsubscribe


        console.log(user)


    },[])


    return (
        <>

            <Header/>

                {currentUser && user.userEmail == currentUser.email?
                    <div className='container user d-flex'>
                        <UserMenu user={user} />
                    </div>
                    :
                    <>
                    <div className='container other-user d-flex'>

                    <OtherUserMenu user={user}/>
                    </div>

                    </> }
                <MobileNavbar />




        </>
    );
}

export default UserProfile;