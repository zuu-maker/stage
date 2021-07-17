import React, {useEffect, useState} from 'react';
import Card from "../events/card";
import Sidebar from "./sidebar";
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {useAuth} from "../../contexts/authContext";
import {useLoader} from "../../contexts/loaderContext";
import Header from "../header/header";
import {useUser} from "../../contexts/userContext";
import BackButton from "../../components/backButton";

function JoinedEvents(props) {
    const {joinedEvents, setJoinedEvents} = useUser();
    const [loading,setLoading] = useState(false)
    const {setLoader,loader} = useLoader();
    const {currentUser} = useAuth();
    let userJoinedEventsList = [];
    let joinedEventsList = [];
    let createdEventsList = [];


    useEffect( ()=>{
        setLoader(true)
        //Get an array of participants that match the current user Is
        getRealtimeChild('Participants', 'userId', currentUser.uid).get()
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
                console.log(e)
            })
        //Filter out events created by the current user
        // joinedEventsList.filter((eachEvent) => {
        //     if (eachEvent.EventCommissionerId != currentUser.uid)
        //         return eachEvent})
        setLoader(false)
    },[])

    return (
        <>
            <Header/>
            <div className={` user container`}>
                <div className={`d-flex`}>
                    <div className={`lg-view`}>

                        <Sidebar/>
                    </div>
                    <div className='flex-column flex-grow-1'>
                        <div className={`mt-4 sm-view`}>
                            <BackButton/>
                        </div>

                        <div className='grid-container'>
                            {!loader && joinedEvents ? joinedEvents?.map(event => {
                                return (
                                    <>

                                        <Card event={event} key={event.id}/>
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