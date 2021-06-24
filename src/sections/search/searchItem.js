import React from 'react';
import basketball from "../../images/basketball.png";
import dummy from "../../images/dummy.png";

function SearchItem({event}) {
    const difficulty ={
        easy : '#18FF00',
        hard : '#D50000',
        veryHard : '#D50000',
        normal : '#D48600',

    }
    return (

<div className='p-3'>
    <div className='d-flex  justify-content-center align-items-center'>
        {/*<div className='cover-img-wrapper'>*/}
        {/*    <img src={basketball} alt=""/>*/}
        {/*</div>*/}
        <span className='card-title'>{event.EventName}</span>
        <span className='cost flex-grow-1 text-right '>${event.EventEntryFee}</span>
    </div>
    <small className='card-category'>
        {event.Eventsport}
    </small>
    <div className='d-flex flex-grow-1'>
        {/*<div className='thumbnail-list d-flex flex-row'>*/}
        {/*    <li className='thumbnail-wrapper'><img src={dummy} alt=""/></li>*/}
        {/*    <li className='thumbnail-wrapper'><img src={dummy} alt=""/></li>*/}
        {/*    <li className='thumbnail-wrapper'><img src={dummy} alt=""/></li>*/}

        {/*    <li className='thumbnail-wrapper'><img src={dummy} alt=""/></li>*/}
        {/*</div>*/}
        {/*<small className='spots'> +{!event.EventCurrentParticipants ? 0 : event.EventCurrentParticipants} going ({event.EventMaximumParticipants} spots left)</small>*/}

    </div>

    <div className=' w-100  d-flex justify-content-center flex-grow-1'>
        <p className='m-0 prize text-light'>
            Prize: ${event.EventTotalPrizes}
        </p>
        {
            event.EventDifficulty === 'Easy' ?
                <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' style={{  backgroundColor: difficulty.easy   }} value=''>{event.EventDifficulty}</button>

                :

                event.EventDifficulty === 'Hard' ?
                    <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' style={{  backgroundColor: difficulty.hard   }} value=''>{event.EventDifficulty}</button>

                    :
                    event.EventDifficulty === 'Medium' ?
                        <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' style={{  backgroundColor: difficulty.normal   }} value=''>{event.EventDifficulty}</button>

                        :
                        <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' style={{  backgroundColor: difficulty.hard   }} value=''>{event.EventDifficulty}</button>

        }
    </div>
</div>



);
}

export default SearchItem;