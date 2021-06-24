import React, {useState} from 'react';
import './events.css'
import {useEvent} from "../../contexts/eventsContext";
import {useLoader} from "../../contexts/loaderContext";
import {realDB} from "../../firebase/firebase";

function Category(props) {
    const {eventsList,setEventsList} = useEvent()
    const {loader, setLoader} =useLoader()



    function handleClick(e) {
        setLoader(true);
            let eventsRef;

            { e.target.value === 'All' ?  eventsRef = realDB.ref('Events')

                :   eventsRef = realDB.ref('Events').orderByChild('Eventsport').equalTo(e.target.value);
            }

            let eventList = []

            eventsRef.on('value',(snapshot) => {

                snapshot.forEach(function(events) {
                    eventList.push({


                        EventName: events.val().EventName,
                        EventEntryFee: events.val().EventEntryFee,
                        eventGame: events.val().EventGame,
                        eventCurrentParticipants: events.val().EventCurrentParticipants,
                        EventMaximumParticipants: events.val().EventMaximumParticipants,
                        EventTotalPrizes: events.val().EventTotalPrizes,
                        EventDifficulty: events.val().EventDifficulty


                    });
                });


                setEventsList(eventList)
                setLoader(false);
            });

        // try {
        //     setLoader(true)
        //     const l = eventFilter('Eventsport',e.target.value)
        //     setEventsList(l)
        //     setLoader(false)
        //
        // } catch (err) {
        //     console.log(err.message)
        //     setLoader(false)
        //
        // }
    }
    return (
        <nav className='mt-4 category  mb-4 navbar navbar-expand-lg'>

            <div className="" id="">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='All'>All</button>
                    </li>
                    <li className="nav-item">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Football'>Football</button>
                    </li>
                    <li className="nav-item">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Tennis'>Tennis</button>
                    </li>
                    <li className="nav-item">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Cricket'>Cricket</button>
                    </li>
                    <li className="nav-item">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Basketball'>Basketball</button>
                    </li>
                    <li className="nav-item ">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Rugby'>Rugby</button>
                    </li>
                    <li className="nav-item ">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='TableTennis'>TableTennis</button>
                    </li>
                    <li className="nav-item ">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Badminton'>Badminton</button>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Category;