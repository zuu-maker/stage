import React, {useEffect, useRef, useState} from 'react';
import basketball from "../../images/basketball.png";
import dummy from "../../images/dummy.png";
import Header from "../header/header";
import EventSection from "./eventSection";
import UserList from "./userList";
import {Link, useHistory, useParams} from 'react-router-dom'
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import Card from "./card";
import {useLoader} from "../../contexts/loaderContext";
import {useUser} from "../../contexts/userContext";
import {useAuth} from "../../contexts/authContext";
import {realDB} from "../../firebase/firebase";
import MobileNavbar from "../../components/mobileNavbar";
import { useStateValue } from '../../contexts/StateProvider';

const EventDetails = () => {

    const [{ hasJoined, user}] = useStateValue()   
    const [eventData,setEventData] =useState();
    const [participants,setParticipants] =useState([]);
    const {loader, setLoader} =useLoader();
    // const { hasJoined,setHasJoined} =useUser();
    // const {currentUser} =useAuth();


    let params = useParams();
    var event = []
    let  childList =[]

    useEffect( ()=>{
        setLoader(true)
        // setHasJoined(false)

        //Fetch event details
        getRealtimeDoc('Events',params.id).then( async function(snapshot) {
            const data = snapshot.val();
           await setEventData(data)
        });
        // console.log(eventData)

        //Fetch participants of the matched id from the URL parameter

        getRealtimeChild('Participants','EventId',params.id).on("child_added", function(snapshot) {
            setParticipants([])
            childList.push(snapshot.val())
            setParticipants(childList)
            console.log(childList)
        });

        console.log(hasJoined)

        console.log(participants);

        setLoader(false)
        return ()=>{
            console.log('unmounted')
        }


    },[])

    return (
        <>
            <Header/>
            {!loader && participants.length > 0 && eventData &&<div className='container event-details '>
                <EventSection event={eventData} participantsList={participants}/>
                <div className='flex-grow-1 user-list-section'>
                    <div className=' pt-3 '>
                        <h5 className='pl-4 text-light'>Participants</h5>
                        <div className='user-list'>
                            {participants ? participants?.map(user => {
                                return (<>

                                        <UserList user={user} key={user.userId}/>


                                    </>
                                )
                            }) : 'No participants yet'}

                        </div>


                    </div>
                </div>

            </div>}
            <MobileNavbar/>
        </>

    );
};

export default EventDetails;