import React, {useEffect, useState} from 'react';
import Search from "../search/search";
import Header from "../header/header";
import './events.css'
import Category from "./category";
import Card from "./card";
import thumb from '../../images/dummy.png'
import basketball from'../../images/basketball.png'
import {CreateEventBtn} from '../modal/modal'
import CardList from '../events/getEvents'
import MobileNavbar from "../../components/mobileNavbar";
import {useAuth} from "../../contexts/authContext";
import {useUser} from "../../contexts/userContext";
import {db, realDB} from "../../firebase/firebase";
import {useEvent} from "../../contexts/eventsContext";
import {useLoader} from "../../contexts/loaderContext";
import { useStateValue } from '../../contexts/StateProvider';
import {useCollection} from "react-firebase-hooks/firestore";
import {useList} from "react-firebase-hooks/database";


function Events() {
    const {eventsList, setEventsList} = useEvent()
    const [participantList, setParticipantList] = useState([])
    const [eventSnap,loading,error] = useList(realDB.ref('Events').orderByChild('EventTimestamp').limitToLast(20))
    const orderedEvents = eventSnap?.reverse()

    const {loader, setLoader} = useLoader()
    // const {setHasJoined} = useUser()
    // const {currentUser} = useAuth()
    const [{user}] = useStateValue()
    let eventList = []
    let participants = []

    useEffect(() => {
        { loading ?
            setLoader(true)
            :
            setLoader(false)
        }
        // eventList= []
        // setEventsList([])
        //
        // //Fetch events ordered by timestamp
        //  realDB.ref('Events').orderByChild('EventTimestamp').limitToLast(20)
        //             .on('value', (snapshot) => {
        //
        //     snapshot.forEach(function (events) {eventList.push(Object.assign(events.val(),{id: events.key}));
        //
        //         //Set event list state and reverse the array order to display latest event
        //         setEventsList(eventList.reverse())
        //
        //
        //     });
        //
        //     setLoader(false);
        //
        //     return () =>{
        //         console.log('Event unmounted')
        //
        //     }
        //
        //
        // });



    }, [loading])


    return (
        <>
        <div  className='container events body'>

<Header/>
            <div className='lg-view'>
                <div className=' d-flex align-items-center pt-4'>
                    <h4 className=' text-light'>All Events</h4>

                    <div className="search-container flex-grow-1 ">
                        <div className='search d-flex float-right'>
                            <Search/>
                            <CreateEventBtn/>
                        </div>


                    </div>
                </div>

            </div>
            <div className='sm-view pl-4 pr-4'>
                <div className='  d-flex justify-content-center align-items-center pt-4'>
                    <div className='flex-grow-1'>
                        { user ? <h4 className='text-light'>Hi {user?.displayName},</h4> :  <h4 className='text-light'>All Events</h4>}
                    <p>Let's Discover a new Adventure</p>


                    </div>

                    <div className="search-container flex-grow-1 ">
                        <div className='search d-flex float-right'>
                            <CreateEventBtn/>
                        </div>


                    </div>

                </div>
                <Search/>

            </div>
            <Category/>
            <div className='grid-container'>
                <>

                    {!loading && orderedEvents  ? orderedEvents.map(event => {
                        return (
                            <>

                                <Card event={event.val()}  key={event.val().id}/>
                            </>
                        )
                    }) : <></>}

                </>

            </div>

        </div>
            <MobileNavbar />
        </>
    );
}

export default Events ;
