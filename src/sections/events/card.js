import React, {useRef, useState} from 'react';
import basketball from '../../images/basketball.png'
import {Link, useHistory} from 'react-router-dom'
import football from '../../images/Football.png'
import tennis from '../../images/tennis.png'
import {useList, useObject} from 'react-firebase-hooks/database';
import {realDB} from "../../firebase/firebase";

const difficulty ={
    easy : '#18FF00',
    hard : '#D50000',
    veryHard : '#D50000',
    normal : '#D48600',

}


function Card({ event }) {
    const history = useHistory()
    const idRef = useRef()
    const [participantSnap,loading, error] = useList(realDB.ref('Participants').orderByChild('EventId').equalTo(event.id && event.id))




    function handleClick(){
        // setLoader(true)
        // getRealtimeDoc('Events',idRef.current.id)
        history.push(`/eventDetails/${idRef.current.id}`)
        // setLoader(false)


    }

    return (
        <card onClick={handleClick} ref={idRef} id={event?.id} className='card pointer overflow-hidden border-0 grid-item event-card'>

                <div className='cover-img-wrapper'>
                    <img src={event?.Eventsport === 'Basketball' ? basketball :event?.Eventsport === 'Football' ? football: event?.Eventsport === 'Tennis' ? tennis: football} alt=""/>
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
                               !loading  && participantSnap &&  participantSnap.slice(0, 4).map((image) =>{ return(



                                    <>

                                           {  image.val().userProfileImageUrl !== undefined && image.val().userProfileImageUrl !== null && <li className='thumbnail-wrapper'><img style={{height:'100%',width: 'auto',maxWidth:'auto'}} src={image.val().userProfileImageUrl} alt=""/>
                                        </li>}

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
