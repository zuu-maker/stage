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
import {realDB} from "../../firebase/firebase";
import {useEvent} from "../../contexts/eventsContext";
import {useLoader} from "../../contexts/loaderContext";


function Events() {
    const {eventsList, setEventsList} = useEvent()
    const [participantList, setParticipantList] = useState([])
    const {loader, setLoader} = useLoader()
    const {setHasJoined} = useUser()
    const {currentUser} = useAuth()
    let eventList = []
    let participants = []

    useEffect(() => {
        setLoader(true);

        //Fetch events ordered by timestamp
        const eventsRef = realDB.ref('Events').orderByChild('EventTimestamp').limitToLast(20);

        eventList= []

        eventsRef.on('value', (snapshot) => {

            snapshot.forEach(function (events) {eventList.push(Object.assign(events.val(),{id: events.key}));

                //Set event list state and reverse the array order to display latest event
                setEventsList([])
                setEventsList(eventList.reverse())


            });
            setLoader(false);

            return () =>{
                console.log('Event unmounted')

            }


        });

    }, [])


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
                        { currentUser ? <h4 className='text-light'>Hi {currentUser.displayName},</h4> :  <h4 className='text-light'>All Events</h4>}
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

                    {!loader && eventsList  ? eventsList?.map(event => {
                        return (
                            <>

                                <Card event={event}  key={event.id}/>
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
