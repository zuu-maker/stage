import React, {useRef, useState} from 'react';
import './signup.css';
import trophy from '../../images/trophy.svg';
import password from '../../images/password.svg';
import mail from '../../images/mail.svg';
import user from '../../images/user.svg';
import {useAuth} from "../../contexts/authContext";
import {pushData, updateDocument} from "../../helper/helper";
import firebase from "firebase";
import { auth } from '../../firebase/firebase';
import {useHistory} from "react-router-dom";


function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    // const {signup, currentUser} = useAuth()
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    let history = useHistory()


     async function handleSubmit(e) {
        e.preventDefault()
            try {
                setError('')
                setLoading(true)
                console.log('before')
                await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
                 .then( userInfo => {
                        var userObj = {
                            userName: username,
                            userWins : 0,
                            userRank: '',
                            userProfileImageUrl:'',
                            userLoses:0,
                            updateProfileAvatarDeliveredTo:[],
                            email: userInfo.user.email,
                            userId: userInfo.user.uid,
                            // emailVerified: userInfo.user.emailVerified,
                            // providerId: userInfo.user.providerId,
                            twitter:'',
                            pushId:'',
                            isOnline:true,
                            footballOption: true,
                            followedUsersIds: [],
                            facebook:'',
                            contact:[],
                            blockedUsers:[],
                            basketballOption: false,
                            balance: 0,
                            objectId:userInfo.user.uid,
                            notificationCounts: 0,
                            loginMethod: 'email'
                        };

                     var user = firebase.auth().currentUser;
                     user.updateProfile({displayName : username,photoURL:'https://firebasestorage.googleapis.com/v0/b/fantasysports-7117e.appspot.com/o/default_profile_photo.svg?alt=media&token=d217e767-41e1-4a94-9f71-4a60b99b3403'})
                         .then(() =>{

                             var updatedInfo = {userProfileImageUrl: user.photoURL}
                             // //Update user Info
                             updateDocument('Users',user.uid,updatedInfo)
                         });
                          pushData('Users',userObj,userInfo.user.uid)
                     // firebase.storage.ref('users/profilePhoto').put(defaultProfilePhoto)
                    }
                )
              history.replace("/events")

            } catch (err) {
                switch (err.code) {

                    case 'auth/email-already-in-use':
                        setError('Email already exists')
                    case 'auth/invalid-email':
                        setError(err.message)
                        break;
                    case 'auth/weak-password':
                        setError(err.message)
                        break;


                }
            }
            setLoading(false)
        console.log(error)



    }

    return (
        <>

            <form className="form" onSubmit={handleSubmit}>
                <div className={`header-content lg-view`}>
                    <img className="form-image" src={trophy} alt=""/>
                    <p className="form-title pt-4">Fantasy Sport Event</p>
                    <p className='form-text f-18'>Please register your details to continue
                        with Fantasy Sport Event</p>
                </div>
                <p className="text-danger">{error}</p>

                <div className="input-group">
                    <input ref={usernameRef} onChange={(e) => setUsername(e.target.value)} name="username"
                           style={{backgroundImage: `url(${user})`}} type="text"
                           placeholder="Username"/>
                    <input ref={emailRef} name="email" style={{backgroundImage: `url(${mail})`}} type="Email"
                           placeholder="Email"/>
                    <input ref={passwordRef} name="password" style={{backgroundImage: `url(${password})`}}
                           type="Password" placeholder="Password"/>

                </div>

                <button disabled={loading} style={{background: loading ? '#ffffff' : ''}} type="submit"><span
                    className='form-btn'>Sign Up</span></button>
            </form>
        </>
    );
}

export default Signup;

                // await signup(emailRef.current.value, passwordRef.current.value).then( userInfo => {
                //         var userObj = {
                //             userName: username,
                //             userWins : 0,
                //             userRank: '',
                //             userProfileImageUrl:'',
                //             userLoses:0,
                //             updateProfileAvatarDeliveredTo:[],
                //             email: userInfo.user.email,
                //             userId: userInfo.user.uid,
                //              emailVerified: userInfo.user.emailVerified,
                //              providerId: userInfo.user.providerId,
                //             twitter:'',
                //             pushId:'',
                //             isOnline:true,
                //             footballOption: true,
                //             followedUsersIds: [],
                //             facebook:'',
                //             contact:[],
                //             blockedUsers:[],
                //             basketballOption: false,
                //             balance: 0,
                //             objectId:userInfo.user.uid,
                //             notificationCounts: 0,
                //             loginMethod: 'email'
                //         };

                //      var user = firebase.auth().currentUser;
                //      user.updateProfile({displayName : username,photoURL:'https://firebasestorage.googleapis.com/v0/b/fantasysports-7117e.appspot.com/o/default_profile_photo.svg?alt=media&token=d217e767-41e1-4a94-9f71-4a60b99b3403'})
                //          .then(() =>{

                //              var updatedInfo = {userProfileImageUrl: user.photoURL}
                //              Update user Info
                //              updateDocument('Users',user.uid,updatedInfo)
                //          });
                //           pushData('Users',userObj,userInfo.user.uid)
                //      firebase.storage.ref('users/profilePhoto').put(defaultProfilePhoto)
                //     }
                // )
