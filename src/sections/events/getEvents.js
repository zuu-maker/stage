import React,{useEffect,useState} from 'react';
import { realDB} from '../../firebase/firebase'
import Card from './card'
import {useEvent} from "../../contexts/eventsContext";
import {useLoader} from "../../contexts/loaderContext";
import {getOptions} from "../../helper/helper";
function CardList() {
    const {eventsList,setEventsList} = useEvent()
    const {loader, setLoader} =useLoader()
  useEffect(() => {
    const eventsRef = realDB.ref('Events').orderByChild('EventTimestamp').limitToLast(48);
    setLoader(true);
   eventsRef.on('value',(snapshot) => {

    let eventList = []
       snapshot.forEach(function(events) {
           eventList.push({


               EventName: events.val().EventName,
               EventEntryFee: events.val().EventEntryFee,
               Eventsport: events.val().Eventsport,
               EventCurrentParticipants: events.val().EventCurrentParticipants,
               EventMaximumParticipants: events.val().EventMaximumParticipants,
               EventTotalPrizes: events.val().EventTotalPrizes,
               EventDifficulty: events.val().EventDifficulty


           });
       });

    setEventsList(eventList)
       setLoader(false);
    console.log(eventsList);


    });

  },[])


    return (
      <>

      { eventsList ? eventsList?.map(event  =>{
          return(
            <Card event={event} />
          )
      }) : 'p'}

</>
    );
}



export default CardList;
