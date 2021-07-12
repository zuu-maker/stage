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


function OtherUserMenu() {

    // const {setSendMessage} =useChat();
    const {setChatRoom} =useChat();
    const {hasFollowed,setHasFollowed,otherUser,setOtherUser,setHasJoined,hasJoined} =useUser();
    const [followers,setFollowers] = useState();
    let params = useParams();

    const {currentUser} =useAuth();
    const {setLoader,loader} =useLoader();
    const history = useHistory()
    const {joinedEvents, setJoinedEvents} = useUser();
    let userJoinedEventsList = [];
    let joinedEventsList = [];


    useEffect(  async () => {


        await db.collection('Users').where('objectId', "==", params.id)
            .onSnapshot((snapshot) => {
                console.log(snapshot.docs.map(doc => doc.data()))
                setOtherUser([])
                const userArr  = snapshot.docs.map(doc => doc.data())
                setOtherUser(userArr?.find( b=>{ return b}))
                userArr.find((follower)  =>{
                    if (currentUser && currentUser.uid===follower  ){
                        setHasFollowed(true)

                        return true;
                    }

                    else{
                        setHasFollowed(false)
                        return false;

                    }
                })

            });
        // .then((snapshot) => {
        //     snapshot.forEach(doc => {
        //          setUser(doc.data())
        //         console.log(doc.data())
        //     })
        //
        // })


        console.log(hasFollowed)




        getRealtimeChild('Participants', 'userId', params.id).on("child_added", function (snapshot) {

            userJoinedEventsList.push(snapshot.val())})

        userJoinedEventsList.forEach((eventJoined) => {
            getRealtimeDoc('Events', eventJoined.EventId).then((snapshot) => {

                joinedEventsList.push(snapshot.val())
            })

        })
        setJoinedEvents(joinedEventsList)

        console.log(joinedEventsList)
        console.log(joinedEvents)



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
        setLoader(true)
        try{
           await updateFirestoreDocument('Users',currentUser.uid,{followedUsersIds:firebase.firestore.FieldValue.arrayUnion(otherUser.objectId)})
               .then( () => {
                   // otherUser.FollowersIds.length += 1;
                   setHasFollowed(true)
                   updateFirestoreDocument('Users', otherUser.objectId, {FollowersIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)})
                       .then(doc => {
                           console.log(doc.data())
                       })
                       .catch(error => {
                           console.log(error);
                       })
               })

        }catch (e) {
            console.log(e)
            setHasFollowed(false)
        }

        setLoader(false)
    }

    //Unfollow a user
    const  handleUnfollow =async (e) => {
        setLoader(true)
        try{
            await updateFirestoreDocument('Users',currentUser.uid,{followedUsersIds:firebase.firestore.FieldValue.arrayRemove(otherUser.objectId)})
                .then( () => {
                    // otherUser.FollowersIds.length -= 1;
                    setHasFollowed(false)
                    updateFirestoreDocument('Users', otherUser.objectId, {FollowersIds: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)})
                        .then(doc => {
                            console.log(doc.data())
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })

        }catch (e) {
            console.log(e)
            setHasFollowed(true)
        }

        setLoader(false)
    }

    return (
        <div className='d-flex user-menu-container'>
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
                        {
                            hasFollowed
                                ?
                                <button disabled={loader} onClick={handleUnfollow} className='btn flex-grow-1 m-2' style={{backgroundImage: `url(${follow})`}}>Unfollow</button>

                                :
                                <button disabled={loader} onClick={handleFollow} className='btn flex-grow-1 m-2' style={{backgroundImage: `url(${follow})`}}>Follow</button>

                                        }


                    </div>
                </div>


            </div>
            <div className='grid-container'>
                <Card event={''}/>
                <Card event={''}/>
            </div>


        </div>

    );
}

export default OtherUserMenu;