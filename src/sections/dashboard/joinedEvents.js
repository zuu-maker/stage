import React, {useEffect, useState} from 'react';
import Card from "../events/card";
import Sidebar from "./sidebar";
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {useAuth} from "../../contexts/authContext";
import {useLoader} from "../../contexts/loaderContext";
import Header from "../header/header";
import {useUser} from "../../contexts/userContext";
import BackButton from "../../components/backButton";
import { useStateValue } from '../../contexts/StateProvider';
import { realDB } from '../../firebase/firebase';

function JoinedEvents(props) {
    const [{user,userData,joinedEvents}, dispatch] = useStateValue()
    // const {joinedEvents, setJoinedEvents} = useUser();
    const [loading,setLoading] = useState(false)
    const {setLoader,loader} = useLoader();
    
    let userJoinedEventsList = [];
    let joinedEventsList = [];
    let createdEventsList = [];

    useEffect( ()=>{
        setLoader(true)
        console.log(userData);
        //Get an array of participants that match the current user Is
        console.log(user.uid);
        // 'YbDgZU6l83YmhwsBY9iIwEOqB4f2'
        // getRealtimeChild('Participants', 'userId', user.uid)
        if(user.uid){
            realDB.ref('Participants').orderByChild('userId').equalTo(user.uid).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    userJoinedEventsList.push(doc.val())
                })

                //Get an array of Events in the participants array
                userJoinedEventsList?.map((eventJoined) => {
                    getRealtimeDoc('Events', eventJoined?.EventId)
                        .then((snapshot) => {
                            joinedEventsList.push(snapshot.val())
                            dispatch({
                                type:"SET_JOINED_EVENTS",
                                joinedEvents:joinedEventsList
                            })
                            // setJoinedEvents(joinedEventsList)

                        })


                        .catch(e => {
                            console.log(e)
                        })

                })

            })
            .catch(e => {
                console.log(e)
            })
        }
       
        //Filter out events created by the current user
        // joinedEventsList.filter((eachEvent) => {
        //     if (eachEvent.EventCommissionerId != user.uid)
        //         return eachEvent})
        setLoader(false)
        
    },[user])
    console.log(joinedEvents[0]);
    
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
                            {!loader && joinedEvents ? joinedEvents[0]?.map(event => {
                              
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