import React, {useEffect, useState} from 'react';
import {realDB} from '../../firebase/firebase'
import Card from './card'
import {useEvent} from "../../contexts/eventsContext";
import {useLoader} from "../../contexts/loaderContext";
import {getOptions, getRealtimeChild} from "../../helper/helper";
import {useUser} from "../../contexts/userContext";
import {useAuth} from "../../contexts/authContext";

function CardList() {
    const {eventsList, setEventsList} = useEvent()
    const [participantList, setParticipantList] = useState([])
    const {loader, setLoader} = useLoader()
    const {setHasJoined} = useUser()
    const {currentUser} = useAuth()
    let eventList = []
    let participants = []

    useEffect(() => {

        //Fetch events ordered by timestamp
        const eventsRef = realDB.ref('Events').orderByChild('EventTimestamp').limitToFirst(3);

        setLoader(true);

        eventsRef.on('value', (snapshot) => {

            //Fetch Participants of each events
            snapshot.forEach(function (events) {
                // console.log(events.key)
                // console.log('outer =>'  ,o+=1)
                eventList.push(Object.assign(events.val(),{id: events.key}));
                // eventList.map((x) =>{
                //     console.log(x.id)
                //     getRealtimeChild('Participants', 'EventId', x.id).get().then(function (snapshot) {
                //
                //         snapshot.forEach(function (p) {
                //             // console.log('p =>',p.key)
                //             // console.log('inner =>'  ,i+=1)
                //             console.log(x.id ,'=>',p.val())
                //
                //             participants.push(p.val())
                //             setParticipantList(participants)
                //             // console.log(participants)
                //
                //         })
                //         // eventList.push(Object.assign(events.val(),{participants:participantList}));
                //
                //         // console.log(participantList)
                //
                //
                //     });
                //     console.log(participants)
                //
                // })




            });

            setEventsList(eventList)
            setLoader(false);
            console.log(eventList)


        });

    }, [])


    return (
        <>

            {eventsList ? eventsList?.map(event => {
                return (
                    <>

                        <Card event={event} key={event.id}/>
                    </>
                )
            }) : 'p'}

        </>
    );
}


export default CardList;
