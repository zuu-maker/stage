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
import BackButton from "../../components/backButton";


function OtherUserMenu({otherUserObj,joinedEventsArray}) {

    const {setChatRoom} =useChat();
    const {hasFollowed,setHasFollowed,otherUser,setOtherUser} =useUser();
    const [followers,setFollowers] = useState();
    const [loading,setLoading] = useState();
    let params = useParams();

    const {currentUser,user} =useAuth();
    const {setLoader,loader} =useLoader();
    const history = useHistory()
    const [joinedEvents, setJoinedEvents] = useState();
    let userJoinedEventsList = [];
    let joinedEventsList = [];


    useEffect(   () => {
        setHasFollowed(false)
        setLoader(true)

        otherUserObj.FollowersIds?.find((follower) => {
                console.log('reached')

                if (currentUser && currentUser.uid === follower) {
                    setHasFollowed(true)

                    return true;
                } else {
                    setHasFollowed(false)
                    return false;

                }
            })



    },[])
    useEffect(   () => {



        setLoading(true)
        console.log(otherUserObj)
        console.log(otherUser)
        {  otherUserObj.userId &&      //Get an array of participants that match the other user Id
            getRealtimeChild('Participants', 'userId',   otherUserObj.userId).get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        userJoinedEventsList.push(doc.val())
                    })

                    //Get an array of Events in the participants array
                    userJoinedEventsList?.map((eventJoined) => {
                        getRealtimeDoc('Events', eventJoined.EventId)
                            .then((snapshot) => {
                                joinedEventsList.push(snapshot.val())
                                setJoinedEvents(joinedEventsList)

                            })


                            .catch(e => {
                                console.log(e)
                            })

                    })

                })
                .catch(e => {
                    console.log(e.message)
                })
            //Filter out events created by the current user
            // joinedEventsList.filter((eachEvent) => {
            //     if (eachEvent.EventCommissionerId != currentUser.uid)
            //         return eachEvent})
            setLoading(false)
        }

        setLoader(false)

    },[])

    //Send a message
    const handleMessage = async (e) => {
        //Chatroom Data
        var data = {
            dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            groupChatName: '',
            groupImageUrl: '',
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
        setLoading(true)

        try{

            await updateFirestoreDocument('Users',currentUser.uid,{followedUsersIds:firebase.firestore.FieldValue.arrayUnion(otherUser.objectId)})
               .then( () => {setHasFollowed(true)
                   // otherUser.FollowersIds.length += 1;

                   updateFirestoreDocument('Users', otherUser.objectId, {FollowersIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)})
                       .then(() =>{
                           setLoading(false)

                       })
                       .catch(error => {
                           console.log(error);
                           setHasFollowed(false)
                           setLoading(false)

                       })
               })

               .catch(e =>{
                   console.log(e)
                   setHasFollowed(false)
                   setLoading(false)

               })

        }catch (e) {
            console.log(e)
            setHasFollowed(false)
            setLoading(false)

        }
        setLoading(false)

    }

    //Unfollow a user
    const  handleUnfollow =async (e) => {
        setLoading(true)
        try{

            await updateFirestoreDocument('Users',currentUser.uid,{followedUsersIds:firebase.firestore.FieldValue.arrayRemove(otherUser.objectId)})
                .then( () => {setHasFollowed(false)
                    // otherUser.FollowersIds.length -= 1;
                    updateFirestoreDocument('Users', otherUser.objectId, {FollowersIds: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)})
                        .then(

                            () =>{setHasFollowed(false)
                            setLoading(false)
                            }

                        )
                        .catch(error => {
                            console.log(error);
                            setHasFollowed(true)
                            setLoading(false)
                        })
                })

        }catch (e) {
            console.log(e)
            setLoading(false)
        }
setLoading(false)
    }

    return (
        <>


            {  otherUser.userId && <div className='d-flex user-menu-container'>
                <div className='d-flex flex-column text-center card-body user-side-bar'>
                    <div className='text-left w-100 '>
                    <BackButton />
                    </div>
                    <div className='text-center  user-info-container'>

                        <div className='position-relative d-flex align-items-center '>
                            <div className='sm-view'>
                                <div className=' other-user-btn'>
                                    <button onClick={handleMessage} className='btn flex-grow-1 m-2 btn-clear'
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

                                    <>
                                        {
                                            !loading && hasFollowed
                                                ?
                                                <button disabled={loader} onClick={handleUnfollow}
                                                        className='btn flex-grow-1 m-2'
                                                        style={{backgroundImage: `url(${follow})`}}></button>

                                                :!loading && !hasFollowed ?
                                                <button disabled={loader} onClick={handleFollow}
                                                        className='btn flex-grow-1 m-2'
                                                        style={{backgroundImage: `url(${follow})`}}></button>

                                                :
                                                <>
                                                    { loading && <button disabled={loading} className='btn flex-grow-1 m-2'>...</button>}

                                                </>
                                        }

                                    </>


                                </div>
                            </div>


                        </div>


                        <div className='mt-5 mb-4 text-light'>
                            <div className='space-medium f-18'>{otherUser.userName}</div>
                            <div className="space-light ">@{otherUser.userName}</div>


                        </div>

                        <div className={`sm-view`}>
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
                                        !loading && hasFollowed
                                            ?
                                            <button disabled={loader} onClick={handleUnfollow}
                                                    className='btn flex-grow-1 m-2'
                                                    style={{backgroundImage: `url(${follow})`}}>Unfollow</button>

                                            :!loading && !hasFollowed ?
                                            <button disabled={loader} onClick={handleFollow}
                                                    className='btn flex-grow-1 m-2'
                                                    style={{backgroundImage: `url(${follow})`}}>Follow</button>

                                            :
                                            <>
                                                { loading && <button disabled={loading} className='btn flex-grow-1 m-2'>Loading...</button>}

                                            </>
                                    }

                                </>


                        </div>
                    </div>


                </div>
                <div className={`flex-column`}>
                    <h4 className={`text-light d-block ml-1`}>Activity</h4>


                    <div className='grid-container'>
                        {!loading &&  joinedEvents ? joinedEvents?.map(event => {
                            return (
                                <>

                                    <Card event={event} key={event.id}/>
                                </>
                            )
                        }) :<>
                            <p className={`mx-auto text-center justify-content-center align-items-center text-light`}>{!loading &&'No recent activity'}</p>

                        </> }
                    </div>
                </div>




            </div>}


        </>
    );
}

export default OtherUserMenu;