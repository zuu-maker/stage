import React, {useEffect} from 'react';
import {useUser} from "../../contexts/userContext";
import {useLoader} from "../../contexts/loaderContext";
import {useAuth} from "../../contexts/authContext";
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import Header from "../header/header";
import Sidebar from "./sidebar";
import Card from "../events/card";
import {Link} from "react-router-dom";
import BackButton from "../../components/backButton";

function CreatedEvents(props) {
    const {createdEvents,setCreatedEvents} = useUser();
    const {setLoader} = useLoader();
    const {currentUser} = useAuth();

    let createdEventsList = [];


    useEffect(()=>{
        console.log('joined link')
        setLoader(true)
        getRealtimeChild('Events','EventCommissionerId',currentUser.uid).get()
            .then((snapshot)=>{
                snapshot.forEach((doc) =>{
                    createdEventsList.push(doc.val())
                })
                setCreatedEvents(createdEventsList)
                console.log(createdEventsList)
                console.log(createdEvents)
            })
            .catch(e => {
                console.log(e)})
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
                            {createdEvents ? createdEvents?.map(event => {
                                return (
                                    <>

                                        <Card event={event} key={event.id}/>
                                    </>
                                )
                            }) :<>
                                <p className={`text-light d-block mx-auto text-center`}>No available created events</p>
                            </> }
                        </div>


                    </div>
                </div>

            </div>

        </>


    );
}

export default CreatedEvents;