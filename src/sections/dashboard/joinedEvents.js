import React, {useEffect, useState} from 'react';
import Card from "../events/card";
import Sidebar from "./sidebar";
import {getDocWithRef, getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {useAuth} from "../../contexts/authContext";
import {useLoader} from "../../contexts/loaderContext";
import Header from "../header/header";
import {useUser} from "../../contexts/userContext";
import BackButton from "../../components/backButton";
import { useStateValue } from '../../contexts/StateProvider';
import { realDB } from '../../firebase/firebase';

function JoinedEvents(props) {
    const [{user,userData}, dispatch] = useStateValue()
    // const {joinedEvents, setJoinedEvents} = useUser();
    const [loading,setLoading] = useState(false)
    const {setLoader,loader} = useLoader();
    const [joinedEvents, setJoinedEvents] = useState([]);

    let userJoinedEventsList = [];
    let joinedEventsList = [];
    let createdEventsList = [];
    let filteredList = [];
    useEffect( ()=>{

        setLoader(true)
        console.log(userData);
        //Get an array of participants that match the current user Is

        if(user.uid){
            //Get an array of participants that match the current user Id

            getRealtimeChild('Participants', 'userId', user?.uid).get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        userJoinedEventsList.push(doc.val())
                    })

                    //Get an array of Events in the participants array
                    userJoinedEventsList?.map((eventJoined) => {
                        getDocWithRef('Events', eventJoined.EventId)
                            .get()
                            .then(async (snapshot) => {
                                joinedEventsList.push(Object.assign(snapshot.val(), {id: snapshot.key}))
                                console.log(snapshot.val())

                                await setJoinedEvents(joinedEventsList)

                                setLoading(false)

                            })


                            .catch(e => {
                                console.log(e)
                                setLoading(false)
                            })

                    })

                })
                .catch(e => {
                    console.log(e)
                    setLoading(false)
                })
            // Filter out events created by the current user
            // joinedEventsList.filter((eachEvent) => {
            //     if (eachEvent.EventCommissionerId != currentUser.uid)
            //         return eachEvent})


        }
       
        //Filter out events created by the current user
        // joinedEventsList.filter((eachEvent) => {
        //     if (eachEvent.EventCommissionerId != user.uid)
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
                            {!loading && joinedEvents ? joinedEvents?.map(event => {
                              
                                return (
                                    <>
                                        {event !== undefined && event !== null && event.EventCommissionerId !== user?.uid &&
                                        <Card event={event} key={event.id}/>}
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