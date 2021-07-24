import React, {useEffect, useRef, useState} from 'react';
import basketball from '../../images/basketball.png'
import dummy from '../../images/dummy.png'
import mail from "../../images/mail.svg";
import {Link, useHistory} from 'react-router-dom'
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {useLoader} from "../../contexts/loaderContext";

const difficulty ={
    easy : '#18FF00',
    hard : '#D50000',
    veryHard : '#D50000',
    normal : '#D48600',

}


function Card({ event }) {
    const history = useHistory()
    const idRef = useRef()
    const eventLevel = event?.EventDifficulty
    const {setLoader} = useLoader()
    const [participants,setParticipants] = useState([]);
    const [loading,setLoading] = useState(false);
    let participantsList =[]
    
    console.log(event);

//     useEffect(() =>{
//         setLoading(true)
//         //Get participants object
//         //Display participants Image on the event card
// try {
//     getRealtimeChild('Participants','EventId',event.id).get()
//         .then(snapshot =>{
//             snapshot.forEach( (doc) =>
//             { participantsList.push(doc.val())})
//             setParticipants(participantsList)
//
//             console.log(participants)
//         })
//         .catch(e => console.log(e.message))
//
// }
// catch (e) {
//     console.log(e)
// }
//         setLoading(false)
//     },[])
    function handleClick(){
        // setLoader(true)
        // getRealtimeDoc('Events',idRef.current.id)
        history.push(`/eventDetails/${idRef.current.id}`)
        // setLoader(false)


    }

    return (
        <card onClick={handleClick} ref={idRef} id={event?.id} className='card pointer overflow-hidden border-0 grid-item event-card'>

                <div className='cover-img-wrapper'>
                    <img src={basketball} alt=""/>
                </div>
            <card className='card-body
            '>
                <div className='d-flex  align-items-center'>
                    <p className='card-title'>{event?.EventName}</p>
                <p className='cost flex-grow-1 text-right '>${event?.EventEntryFee}</p>
                </div>
                <p className='card-category'>
                    {event?.Eventsport}
                </p>
                <div className='d-flex flex-grow-1'>

                    <div className='thumbnail-list d-flex flex-row'>
                        <>
                            {
                               !loading && participants.userProfileImageUrl &&   participants?.map((image) =>{return(


                                    <>
                                        <li className='thumbnail-wrapper'><img src={image.userProfileImageUrl} alt=""/></li>

                                    </>)
                                })
                            }
                        </>
             </div>
                    <p className='spots'> +{parseInt(event?.EventCurrentParticipants) > 0 ? event?.EventCurrentParticipants : 0} going ({parseInt(event?.EventMaximumParticipants)-parseInt(event?.EventCurrentParticipants)} spots left)</p>

                </div>

                <div className=' w-100 card-footer d-flex justify-content-center flex-grow-1'>
                    <p className='m-0 prize text-light'>
                        Prize: ${event?.EventTotalPrizes}
                    </p>
                    {
                        event?.EventDifficulty === 'Easy' ?
                            <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' style={{  backgroundColor: difficulty.easy   }} value=''>{event?.EventDifficulty}</button>

                    :

                            event?.EventDifficulty === 'Hard' ?
                                <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' style={{  backgroundColor: difficulty.hard   }} value=''>{event?.EventDifficulty}</button>

                    :
                                event?.EventDifficulty === 'Medium' ?
                                    <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' style={{  backgroundColor: difficulty.normal   }} value=''>{event?.EventDifficulty}</button>

                    :
                                        <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' style={{  backgroundColor: difficulty.hard   }} value=''>{event?.EventDifficulty}</button>

                    }
                </div>
            </card>
        </card>
    );
}



export default Card;
