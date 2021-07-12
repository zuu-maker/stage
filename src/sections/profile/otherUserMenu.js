import React, {useEffect, useState} from 'react';
import rank from "../../images/rank.svg";
import follow from "../../images/follow.svg";
import back_arrow from "../../images/back_arrow.svg";
import message from "../../images/message_green.svg";
import {Link, useHistory, useParams} from "react-router-dom";
import arrow from "../../images/arrow right.svg";
import Graph from "./graph";
import {
    getRealtimeChild,
    getRealtimeDoc,
    pushFireStoreData,
    updateDocument,
    updateFirestoreDocument
} from "../../helper/helper";
import Card from "../events/card";
import firebase from "firebase";
import {db} from "../../firebase/firebase";
import defaultProfilePhoto from "../../images/default_profile_photo.svg";
import {useChat} from "../../contexts/messageContext";
import {useAuth} from "../../contexts/authContext";
import {useLoader} from "../../contexts/loaderContext";
import {useUser} from "../../contexts/userContext";


function OtherUserMenu({otherUserObj,joinedEventsArray}) {

    const {setChatRoom} =useChat();
    const {hasFollowed,setHasFollowed,otherUser,setOtherUser} =useUser();
    const [followers,setFollowers] = useState();
    let params = useParams();

    const {currentUser,user} =useAuth();
    const {setLoader,loader} =useLoader();
    const history = useHistory()
    const [joinedEvents, setJoinedEvents] = useState();
    let userJoinedEventsList = [];
    let joinedEventsList = [];


    useEffect(   () => {
        user.followedUsersIds?.find((follower)  =>{
            if (otherUserObj.userId===follower  ){
                setHasFollowed(true)

                return true;
            }

            else{
                setHasFollowed(false)
                return false;

            }
        })


    },[])
    useEffect(   () => {





        getRealtimeChild('Participants', 'userId', params.id).on("child_added", function (snapshot) {

            userJoinedEventsList?.push(snapshot.val())})

        userJoinedEventsList.forEach((eventJoined) => {
            getRealtimeDoc('Events', eventJoined.EventId).then((snapshot) => {

                joinedEventsList?.push(snapshot.val())
            })

        })
        setJoinedEvents(joinedEventsList)

        console.log(joinedEventsList)
        console.log(joinedEvents)

setLoader(false)

    },[])

    const handleMessage = async (e) => {
        //Chatroom Data
        var data = {
            dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            groupChatName: otherUser.userName,
            groupImageUrl: otherUser.userProfileImageUrl,
            isGroupChat: false,
            participants: [{objId : currentUser.uid,userName: currentUser.displayName,email: currentUser.email,userProfileImage:currentUser.photoURL},{objId : otherUser.userId,userName: otherUser.userName,email: otherUser.email,userProfileImage: otherUser.userProfileImageUrl}]
        }
        //Show Loader
        setLoader(true)

        //Create a chatroom once user clicks on message
        await db.collection('ChatRooms').add(data).then(function (docRef) {

            setChatRoom(Object.assign(data,{chatRoomId: docRef.id}))

            // Update Id field in the chatroom document using the document reference id
            docRef.update({chatRoomId: docRef.id})

            // Hide Loader
            setLoader(false)

            // Redirect to the newly created chatRoom  endpoint
            history.push(`/messages/${docRef.id}`)

        })
            .catch(function (error) {
                setLoader(false)
                console.error("Error adding document: ", error);
            });

    }
    //Follow a user
    const  handleFollow =async (e) => {
        try{

            await updateFirestoreDocument('Users',currentUser.uid,{followedUsersIds:firebase.firestore.FieldValue.arrayUnion(otherUser.objectId)})
               .then( () => {
                   // otherUser.FollowersIds.length += 1;

                   updateFirestoreDocument('Users', otherUser.objectId, {FollowersIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)})
                       .then(() =>{setHasFollowed(true)})
                       .catch(error => {
                           console.log(error);
                           setHasFollowed(false)
                       })
               })
               .catch(e =>{
                   console.log(e)
                   setHasFollowed(false)
               })

        }catch (e) {
            console.log(e)
            setHasFollowed(false)
        }

    }

    //Unfollow a user
    const  handleUnfollow =async (e) => {
        try{

            await updateFirestoreDocument('Users',currentUser.uid,{followedUsersIds:firebase.firestore.FieldValue.arrayRemove(otherUser.objectId)})
                .then( () => {setHasFollowed(false)
                    // otherUser.FollowersIds.length -= 1;
                    updateFirestoreDocument('Users', otherUser.objectId, {FollowersIds: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)})
                        .then(

                            () =>{setHasFollowed(false)}

                        )
                        .catch(error => {
                            console.log(error);
                            setHasFollowed(true)
                        })
                })

        }catch (e) {
            console.log(e)
        }

    }

    return (
        <>


            {  otherUser.userId && <div className='d-flex user-menu-container'>
                <div className='d-flex flex-column text-center card-body user-side-bar'>
                    <div className='sm-view text-left w-100 back-arrow'>
                        <img src={back_arrow} alt=""/>
                    </div>
                    <div className='text-center  user-info-container'>

                        <div className='position-relative d-flex align-items-center '>
                            <div className='sm-view'>
                                <div className=' other-user-btn'>
                                    <button className='btn flex-grow-1 m-2 btn-clear'
                                            style={{backgroundImage: `url(${message})`}}></button>

                                </div>
                            </div>

                            {otherUser && otherUser.userProfileImageUrl
                                ?
                                <div className='mx-auto user-profile-pic-wrapper'
                                     style={{backgroundImage: `url(${otherUser.userProfileImageUrl})`}}></div>


                                :
                                <div className='mx-auto user-profile-pic-wrapper'
                                     style={{backgroundImage: `url(${defaultProfilePhoto})`}}></div>


                            }
                            {/*<img src={otherUser.userProfileImageUrl} alt=""/>*/}
                            <div className='badge-wrapper'>
                                <img src={rank} alt=""/>
                                <span className='ml-2'>0</span>
                            </div>
                            <div className='sm-view'>
                                <div className=' other-user-btn'>
                                    <button onClick={handleFollow} className='btn flex-grow-1 m-2'
                                            style={{backgroundImage: `url(${follow})`}}></button>

                                </div>
                            </div>


                        </div>


                        <div className='mt-5 mb-4 text-light'>
                            <div className='space-medium f-18'>{otherUser.userName}</div>
                            <div className="space-light ">@{otherUser.userName}</div>

                        </div>
                        <div className='sm-view'>
                            <Graph/>
                        </div>


                    </div>
                    <div className='p-3  center  followers-container text-light mb-4'>
                        <div className='flex-column border-right d-inline-flex text-center flex-grow-1 follow-stats'>
                            <span>{otherUser.FollowersIds && otherUser.FollowersIds.length}</span>
                            <span>Followers</span>
                        </div>
                        <div className='flex-column d-inline-flex text-center flex-grow-1 follow-stats'>
                            <span>{otherUser.followedUsersIds && otherUser.followedUsersIds.length}</span>
                            <span>Following</span>
                        </div>

                    </div>
                    <div className='lg-view'>
                        <div className='   center other-user-btn'>
                            <button onClick={handleMessage} className='btn flex-grow-1 m-2 btn-clear'
                                    style={{backgroundImage: `url(${message})`}}>Message
                            </button>

                                <>
                                    {
                                        !loader && hasFollowed
                                            ?
                                            <button disabled={loader} onClick={handleUnfollow}
                                                    className='btn flex-grow-1 m-2'
                                                    style={{backgroundImage: `url(${follow})`}}>Unfollow</button>

                                            :!loader && !hasFollowed ?
                                            <button disabled={loader} onClick={handleFollow}
                                                    className='btn flex-grow-1 m-2'
                                                    style={{backgroundImage: `url(${follow})`}}>Follow</button>

                                            :
                                            <button disabled={loader} className='btn flex-grow-1 m-2'
                                            >Loading...</button>
                                    }

                                </>


                        </div>
                    </div>


                </div>
                <div className={`flex-column`}>
                    <h4 className={`text-light d-block ml-1`}>Activity</h4>


                    <div className='grid-container'>
                        {joinedEvents ? joinedEvents?.map(event => {
                            return (
                                <>

                                    <Card event={event}/>
                                </>
                            )
                        }) :<>
                            <p>No recent activity</p>

                        </> }
                    </div>
                </div>




            </div>}


        </>
    );
}

export default OtherUserMenu;