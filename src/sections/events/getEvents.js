import React,{useEffect,useState} from 'react';
import { realDB} from '../../firebase/firebase'
import Card from './card'
import {useEvent} from "../../contexts/eventsContext";
import {useLoader} from "../../contexts/loaderContext";
import {getOptions, getRealtimeChild} from "../../helper/helper";
import {useUser} from "../../contexts/userContext";
function CardList() {
    const {eventsList,setEventsList} = useEvent()
    const [participantList,setParticipantList] = useState([])
    const {loader, setLoader} =useLoader()
    const {setHasJoined} =useUser()

    useEffect(() => {

    const eventsRef = realDB.ref('Events').orderByChild('EventTimestamp').limitToLast(48);

    setLoader(true);
   eventsRef.on('value',(snapshot) => {

    let eventList = []
    let participants = []
       snapshot.forEach(function(events) {
           // getRealtimeChild('Participants','EventId',events.key).on("child_added", function(snapshot) {
           //
           //     setParticipantList([])
           //     participants.push(snapshot.val())
           //     setParticipantList(participants)
           //     console.log(participantList)
           //
           // });
           eventList.push({
               id: events.key,
               EventName: events.val().EventName,
               EventEntryFee: events.val().EventEntryFee,
               Eventsport: events.val().Eventsport,
               EventCurrentParticipants: events.val().EventCurrentParticipants,
               EventMaximumParticipants: events.val().EventMaximumParticipants,
               EventTotalPrizes: events.val().EventTotalPrizes,
               EventDifficulty: events.val().EventDifficulty,


           });
       });

    setEventsList(eventList)
       setLoader(false);


    });

  },[])


    return (
      <>

      { eventsList ? eventsList?.map(event  =>{
          return(
              <>

            <Card event={event} key={event.id} />
              </>
          )
      }) : 'p'}

</>
    );
}



export default CardList;
