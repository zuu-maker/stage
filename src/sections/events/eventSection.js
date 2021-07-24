import React, {useRef, useState, useEffect} from 'react';
import basketball from "../../images/basketball.png";
import schedule from "../../images/created_schedule.png";
import trophy from "../../images/trophy.png";
import back_arrow from "../../images/back_arrow.svg";
import participants from "../../images/participants.png";
import puma from "../../images/982449831d9206873c5c48552ee07e42.png";
import adiddas from "../../images/adidas_brand.png";
import nike from "../../images/nike-squarelogo-1486596898031.png";
import dummy from "../../images/dummy.png";
import {
    getRealtimeDoc,
    pushRealData,
    timeConverter,
    updateFirebaseDocument,
    updateFirestoreDocument
} from '../../helper/helper'
import './eventDetails.css'
import {useUser} from "../../contexts/userContext";
import {useHistory, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/authContext";
import {Modal} from "react-bootstrap";
import {realDB} from "../../firebase/firebase";
import logo from '../../images/logo.png';
import {useLoader} from "../../contexts/loaderContext";
import BackButton from "../../components/backButton";
import { useStateValue } from '../../contexts/StateProvider';

function EventSection({event,participantsList}) {
    const [{user,hasJoined,joinedEvents},dispatch] = useStateValue()
    const commisionerId = useRef()
    // const {setHasJoined,hasJoined,joinedEvents, setJoinedEvents} =useUser();
    // const {currentUser,user} =useAuth();
    const {loader} =useLoader();
    const [accountBalance ,setAccountBalance] = React.useState()
    const [modal ,setModal] = useState(false)
    const secondCommissionerId = useRef()
    const participantId = useRef()
    const startDate = timeConverter(parseInt(event.EventStartDate),'D-M-Y');
    const endDate = timeConverter(parseInt(event.EventEndDate),'D-M-Y');
    let params = useParams();
    const history = useHistory()

    const eventId = {EventId : params.id};
    const joined = {joined : true};

    useEffect( () =>{
        console.log(hasJoined)

        //Check if current user is in the participants list
        //If true then setHasJoined to true and show joined button
        participantsList?.find((participant)  =>{
            if (participant.userId === user.uid){
                dispatch({
                    type:"SET_HAS_JOINED",
                    hasJoined:true,
                })
                console.log(hasJoined)
                return true;
            }

            else{
                dispatch({
                    type:"SET_HAS_JOINED",
                    hasJoined:false,
                })
                console.log(hasJoined)

                return false;

            }
        })


    },[])

    //This function handles joining an event
    const  handleJoinEvent = async (e) => {

        //Check if current user balance is more than the event entry fee
        if (parseInt(user.balance) >= parseInt(event.EventEntryFee)) {
            //Combine user object and eventId
            const userData = Object.assign({}, user, eventId, joined, {userId : user.uid});

            console.log(userData)
            if (user && user.userId) {
                //Remaining balance deducted from the user balance  after Joining event
                const remainingBalance = parseInt(user.balance) - parseInt(event.EventEntryFee)

                //Update user balance in firestore User document
                updateFirestoreDocument('Users', user.uid, {balance: remainingBalance})
                    .then(() => {

                        //Update user balance in firebase User document
                        updateFirebaseDocument('Users', user.uid, {userBalance: remainingBalance})
                            .catch(e => console.log(e))

                    })
                    .catch(e => console.log(e))

                //Add current user to the firebase participants collection
                pushRealData('Participants', userData)
                    .then((snapshot) => {
                        dispatch({
                            type:"SET_HAS_JOINED",
                            hasJoined:true
                        })
                        
                        dispatch({
                            type:"SET_JOINED_EVENTS",
                            joinedEvents:event
                        })
                            // joinedEvents ? setJoinedEvents([...joinedEvents, event]) : setJoinedEvents(event)
                        

                        //Update EventCurrentParticipants field in the Events document
                        updateFirebaseDocument('Events', event.id, {EventCurrentParticipants: parseInt(event.EventCurrentParticipants) + 1})
                    })
                    .catch(e => console.log(e))


            }else {console.log('error joining event')}

        } else{
            console.log(user.balance)
            alert('Please Deposit funds')
            dispatch({
                type:"SET_HAS_JOINED",
                hasJoined:false
            })
            // setHasJoined(false)


        }
    }

    return (
        <>
            {modal ? <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal"
                className="custom-modal" //Add class name here
            /> : <></>}
            <div className=' event-detail-container flex-column'>
                <button onClick={console.log(user.uid)}>click me</button>
                <div className=' mb-4 position-relative overflow-hidden m-0 border-0 grid-item event-card'>
                    {/*<img className='sm-view  back-arrow' src={back_arrow} alt=""/>*/}
                    <div className={`sm-view position-absolute back-arrow`}>
                        <BackButton/>
                    </div>

                    <div className='cover-img-wrapper'>
                        <img src={basketball} alt=""/>
                    </div>

                    <button className='ml-auto mr-0  text-light btn-danger difficulty-btn '
                            value=''>{event.EventDifficulty}
                    </button>

                </div>
                <div className='event-info'>
<div className='lg-view flex-column'>
    <div className='d-flex  align-items-center'>
        <p className='event-detail-title text-light'>{event.EventName}</p>
        <div className='join-btn mr-0 ml-auto'>
            <>
                {!loader && participantsList.length >= parseInt(event.EventMaximumParticipants) ?<button  className='   btn  '>Event Full</button> :
                    <>

                {!loader &&  hasJoined ? <button className='   btn  '>Registered</button> :!loader &&  !hasJoined ? <button onClick={handleJoinEvent} className='   btn  '>Join Event</button>:  <button  className='   btn  '>Loading...</button> }

                    </>
                        }


            </>


        </div>
    </div>
    <div className='d-flex card-category'>
        <p className='cost  '>${event.EventEntryFee}</p>
        <p className='ml-5  '>{event.Eventsport}</p>


    </div>
</div>
                    <div className='sm-view'>
                        <div className='d-flex  flex-wrap align-items-center'>
                            <p className='event-detail-title text-light'>{event.EventName}</p>
                            <p className='cost  ml-auto mr-0 text-right'>${event.EventEntryFee}</p>


                        </div>
                        <p className=''>{event.Eventsport}</p>



                    </div>
                    <div className='d-flex flex-wrap '>
                        <p className=' text-light event-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem distinctio pariatur
                            voluptates. Delectus, eum, tenetur? Consequatur esse, ipsam modi nam nemo numquam
                            perspiciatis quis unde vero! Ab eaque perferendis quod!</p>
                        <div className='d-sm-block d-md-block mt-2 mb-4 d-lg-none w-100'>
                            {!loader &&  hasJoined ? <button className='  w-100 btn  '>Registered</button> :!loader &&  !hasJoined ? <button onClick={handleJoinEvent} className='  w-100 btn  '>Join Event</button>:  <button  className=' w-100  btn  '>Loading...</button> }

                        </div>

                    </div>
                    <div className='mb-3 about-section'>
                        <h5 className='text-light mt-4 mb-4'>About</h5>
                        <div className='d-flex event-icon-container'>
                            <div className='d-flex  icon-item align-items-center flex-grow-1'>
                                <div className='icon-wrapper'>
                                    <div className='center'>
                                        <img src={schedule} alt=""/>

                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <div className='text-light f-20 about-upper-info'>{startDate} - {endDate }</div>
                                    <div className='text-light about-low-info'>Start Date - End Date</div>
                                </div>
                            </div>
                            <div className='d-flex  icon-item align-items-center flex-grow-1'>
                                <div className='icon-wrapper'>
                                    <div className='center'>
                                        <img src={participants} alt=""/>

                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <div className='text-light about-upper-info'>{participantsList.length}/{event.EventMaximumParticipants}</div>
                                    <div className='text-light about-low-info'>Joined/Total Participants</div>
                                </div>
                            </div>
                            <div className='d-flex  icon-item align-items-center flex-grow-1'>
                                <div className='icon-wrapper'>
                                    <div className='center'>
                                        <img src={trophy} alt=""/>

                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <div className='text-light about-upper-info'>${event.EventTotalPrizes}</div>
                                    <div className='text-light about-low-info'>Prize</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
<div className='commissioner-section'>
                        <h5 className='text-light mt-4 mb-4'>Commissioner</h5>
                        <div className='d-flex commissioner-icon-container space-light'>
                            <div className='d-flex flex-grow-1'>
                                { event.EventCommissionerId && event.EventCommissionerId != 'None'?<>
                                        <div id={event.EventCommissionerId} ref={commisionerId} className='mr-3 align-items-center'>
                                            <div onClick={() =>{history.push(`/user/${event.EventCommissionerId}`)}} className='commissioner-icon-wrapper'>
                                                <div className='center'>
                                                    <img src={event.EventCommissionerProfile} alt=""/>

                                                </div>
                                            </div>
                                            <p className='text-light text-center mt-2'>{event.EventCommissioner}</p>


                                        </div>

                                    </>  :
                                <></>}
                                <div id={event.EventSecondCommissionerId} ref={secondCommissionerId} className='mr-3 align-items-center'>
                                    <div className='commissioner-icon-wrapper'>
                                        <div className='center'>
                                            <img src={logo} alt=""/>

                                        </div>
                                    </div>
                                    <p className='text-light text-center mt-2'>Fantasy Sports</p>


                                </div>
                                { event.EventSecondCommissionerId && event.EventSecondCommissionerId !== 'None'?<>
                                        <div id={event.EventSecondCommissionerId} ref={secondCommissionerId} className='mr-3 align-items-center'>
                                            <div className='commissioner-icon-wrapper'>
                                                <div className='center'>
                                                    <img src={nike} alt=""/>

                                                </div>
                                            </div>
                                            <p className='text-light text-center mt-2'>{event.EventSecondCommissionerId}</p>


                                        </div>

                                    </>  :
                                    <></>}

                            </div>

                        </div>
                    </div>
                    </div>



                </div>
            </div>
        </>
    );
}


export default EventSection;