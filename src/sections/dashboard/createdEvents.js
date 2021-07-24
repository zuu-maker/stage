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
import { useStateValue } from '../../contexts/StateProvider';

function CreatedEvents(props) {
    const [{user,createdEvents}, dispatch] = useStateValue()
    // const {createdEvents,setCreatedEvents} = useUser();
    const {setLoader} = useLoader();
    // const {user} = useAuth();
    console.log(user);

    let createdEventsList = [];


    useEffect(()=>{
        console.log('joined link')
        setLoader(true)
        if(user.uid){
            getRealtimeChild('Events','EventCommissionerId',user?.uid).get()
            .then((snapshot)=>{
                snapshot.forEach((doc) =>{
                    createdEventsList.push(doc.val())
                })
                dispatch({
                    type:"SET_CREATED_EVENTS",
                    createdEvents:createdEventsList
                })
                // setCreatedEvents(createdEventsList)
                console.log(createdEventsList)
                console.log(createdEvents)
            })
            .catch(e => {
                console.log(e)})
        }
        setLoader(false)
    },[user])

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
                            {createdEvents ? createdEvents[0]?.map(event => {
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