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

const EventDetails = () => {
    const [eventData,setEventData] =useState([]);
    const [participants,setParticipants] =useState([]);
    const {loader, setLoader} =useLoader();
    const { hasJoined,setHasJoined} =useUser();
    const {currentUser} =useAuth();


    let params = useParams();
    var event = []
    let  childList =[]

    useEffect( ()=>{
        setLoader(true)
        getRealtimeDoc('Events',params.id).then(function(snapshot) {
            const data = snapshot.val();
            setEventData(data)
        });
        // console.log(eventData)
        getRealtimeChild('Participants','EventId',params.id).on("child_added", function(snapshot) {

            setParticipants([])
            console.log(participants)
            childList.push(snapshot.val())
            setParticipants(childList)
            // snapshot.forEach(doc =>{
            //   const data = doc.val()
            //   childList.push(data)
            //
            // })
        });
        setLoader(false)

        console.log(participants);

        setHasJoined(false)
        participants.filter(function (entry) {
            { entry.userId === currentUser.uid ? setHasJoined(true) : setHasJoined(false) }
            console.log(entry.userId === currentUser.uid)
            console.log(entry.userId )

            return entry.userId === currentUser.uid;
        });
        console.log(hasJoined)

    },[])

    return (
        <>
            <Header/>
            <div className='container event-details '>
                <EventSection event={eventData} participantList={participants.length}/>
                <div className='flex-grow-1 user-list-section'>
                    <div className=' pt-3 '>
                        <h5 className='pl-4 text-light'>Participants</h5>
                        <div className='user-list'>
                            { participants ? participants?.map(user  =>{
                                return(<>

                                            <UserList  user={user} key={user.userId} />


                                    </>
                                )
                            }) : 'No participants yet'}

                        </div>


                    </div>
                </div>

            </div>
        </>

    );
};

export default EventDetails;