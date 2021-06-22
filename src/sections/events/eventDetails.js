import React, {useEffect, useRef, useState} from 'react';
import basketball from "../../images/basketball.png";
import dummy from "../../images/dummy.png";
import Header from "../header/header";
import EventSection from "./eventSection";
import UserList from "./userList";
import {Link, useHistory, useParams} from 'react-router-dom'
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import Card from "./card";

const EventDetails = () => {
    const [eventData,setEventData] =useState([]);
    const [participants,setParticipants] =useState([]);


    let params = useParams();
    var event = []
    let  childList =[]

    useEffect(()=>{
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
        console.log(participants);




    },[])

    return (
        <>
            <Header/>
            <div className='container event-details '>
                <EventSection event={eventData} participantList={participants.length}/>
                <div className='flex-grow-1'>
                    <div className=' pt-3 user-list-section'>
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