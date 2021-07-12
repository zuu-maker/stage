import React, {useEffect, useState} from 'react';
import Card from "../events/card";
import Sidebar from "./sidebar";
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {useAuth} from "../../contexts/authContext";
import {useLoader} from "../../contexts/loaderContext";
import Header from "../header/header";
import {useUser} from "../../contexts/userContext";

function JoinedEvents(props) {
    const {joinedEvents, setJoinedEvents} = useUser();
    const {setLoader} = useLoader();
    const {currentUser} = useAuth();
    let userJoinedEventsList = [];
    let joinedEventsList = [];
    let createdEventsList = [];


    useEffect(async ()=>{
        setLoader(true)
        getRealtimeChild('Participants','userId',currentUser.uid).get()
            .then((snapshot)=>{
                snapshot.forEach((doc) =>{
                    userJoinedEventsList.push(doc.val())
                })
            })
            .catch(e => {
                console.log(e)})

    },[])
    useEffect(async ()=>{
        // getRealtimeChild('Participants', 'userId', currentUser.uid).on("child_added", function (snapshot) {
        //     userJoinedEventsList.push(snapshot.val())
        //
        //
        // })
        userJoinedEventsList?.forEach((eventJoined) => {
            // realDB.ref('Events'+'/'+eventJoined.EventId).on('value',(snapshot) =>{
            //     console.log(snapshot)
            //     console.log(snapshot.val())
            // })
            getRealtimeDoc('Events', eventJoined.EventId).then((snapshot) => {

                joinedEventsList.push(snapshot.val())
            })

        })
        console.log(joinedEventsList)

        setJoinedEvents(joinedEventsList)

        console.log(joinedEvents)

setLoader(false)
    },[])

    return (
        <>
            <Header/>
            <div className={` user container`}>
                <div className={`d-flex`}>
                    <Sidebar/>
                    <div className='flex-column flex-grow-1'>

                        <div className='grid-container'>
                            {joinedEvents ? joinedEvents?.map(event => {
                                return (
                                    <>

                                        <Card event={event}/>
                                    </>
                                )
                            }) :<>

                            </> }
                        </div>


                    </div>
                </div>

            </div>

        </>


    );
}

export default JoinedEvents;