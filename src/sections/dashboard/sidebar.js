import React, {useEffect, useState} from 'react';
import rank from "../../images/rank.svg";
import join_event from "../../images/join_event.svg";
import create_event from "../../images/created_event.svg";
import create_schedule from "../../images/created_schedule.svg";
import deposit from "../../images/deposit_fund.svg";
import withdraw from "../../images/withdraw_fund.svg";
import arrow from "../../images/arrow right.svg";
import {
    Link, useParams, useHistory
} from "react-router-dom";
import {useAuth} from "../../contexts/authContext";
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {EditProfileBtn} from "../modal/modal";
import {useUser} from "../../contexts/userContext";
import {useLoader} from "../../contexts/loaderContext";
import Graph from "../profile/graph";
import {useTransaction} from "../../contexts/transactionContext";
import axios from "axios";

function Sidebar() {
    const {currentUser} = useAuth();
    let params = useParams();
    const {joinedEvents, createdEvents, setJoinedEvents, setCreatedEvents} = useUser();
    const {setLoader} = useLoader();
    let userJoinedEventsList = [];
    let joinedEventsList = [];
    let createdEventsList = [];
    const history = useHistory()
    const {transactions, setTransactions} = useTransaction()
    const transactionList = []



    //Fetch Joined events on click
    const handleJoinedEvents = () => {
        setLoader(true)
        //Get an array of participants that match the current user Is
        getRealtimeChild('Participants', 'userId', currentUser.uid).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    userJoinedEventsList.push(doc.val())
                })

                //Get an array of Events in the participants array
                userJoinedEventsList?.map((eventJoined) => {
                    getRealtimeDoc('Events', eventJoined.EventId)
                        .then((snapshot) => {
                            joinedEventsList.push(snapshot.val())
                            setJoinedEvents(joinedEventsList)

                        })


                        .catch(e => {
                            console.log(e)
                        })

                })

            })
            .catch(e => {
                console.log(e)
            })
        //Filter out events created by the current user
        // joinedEventsList.filter((eachEvent) => {
        //     if (eachEvent.EventCommissionerId != currentUser.uid)
        //         return eachEvent})
        console.log(joinedEvents)
        setLoader(false)
        history.push(`/user/${currentUser.uid}/joined-events`)

    }

    //Fetch created events on click
    const handleCreatedEvents = () => {
        setLoader(true)
        getRealtimeChild('Events', 'EventCommissionerId', currentUser.uid).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    createdEventsList.push(doc.val())
                })
                setCreatedEvents(createdEventsList)
                console.log(createdEvents)
            })
            .catch(e => {
                console.log(e)
            })
        setLoader(false)
        history.push(`/user/${currentUser.uid}/created-events`)

    }

    //Fetch current user transactions from Transaction collection in firebase
    const handleDeposit = () => {

        setLoader(true)
        //Get an array of participants that match the current user Is
        getRealtimeChild('Transaction', 'userId', currentUser.uid).on('value', (snapshot) => {
            snapshot.forEach((doc) => {
                transactionList.push(doc.val())
            })
            setTransactions([])
            setTransactions(transactionList)
        })
        setLoader(false)
        history.push(`/user/${currentUser.uid}/deposit`)

    }

    //Fetch current user transactions from Transaction collection in firebase
    const handleWithdrawal= () => {

        setLoader(true)
        //Get an array of participants that match the current user Is
        getRealtimeChild('Transaction', 'userId', currentUser.uid).on('value', (snapshot) => {
            snapshot.forEach((doc) => {
                transactionList.push(doc.val())
            })
            setTransactions([])
            setTransactions(transactionList)
        })
        setLoader(false)
        history.push(`/user/${currentUser.uid}/withdraw`)

    }

    return (
        <>

            <div className='d-flex flex-grow-1 flex-column  card-body user-side-bar'>
                <div className='user-sidebar-header'>
                    <div className='flex-column'>
                        <h5 className='text-light'>Your Profile</h5>

                        <p className=''>Manage Your Account Info</p>

                    </div>
                    <div className=' ml-auto pointer menu-icon-wrapper text-center '>
                        <EditProfileBtn/>

                    </div>

                </div>
                <div className='text-center  user-info-container'>

                    <div className='position-relative'>
                        <div className='mx-auto d-block user-profile-pic-wrapper'>

                            <img src={currentUser && currentUser.photoURL} alt=""/>

                        </div>
                        <div className='badge-wrapper'>
                            <img src={rank} alt=""/>
                            <span className='ml-2'>0</span>
                        </div>
                    </div>


                    <div className='mt-3 text-light'>
                        <div className='space-medium f-18'>{currentUser.displayName}</div>
                        <div className="space-light mb-4">@{currentUser.displayName}</div>

                    </div>
                    <div className='sm-view'>
                        {/*<Graph/>*/}

                    </div>

                </div>
                <div className='d-sm-block d-lg-none d-md-block'>
                    <Graph/>
                </div>
                <div className='menu-options'>

                    <div onClick={handleJoinedEvents} className=' m-3 pointer  menu-item'>
                        <div className='icon-wrapper'>
                            <div className='center'>
                                <img src={join_event} alt=""/>

                            </div>
                        </div>
                        <div className='ml-3'>
                            <div className='text-light space-light'>Joined Events</div>
                        </div>
                        <div className='mr-0 ml-auto'>
                            <img src={arrow} alt=""/>
                        </div>
                    </div>


                    <div onClick={handleCreatedEvents} className='menu-item m-3 pointer '>
                        <div className='icon-wrapper'>
                            <div className='center'>
                                <img src={create_event} alt=""/>

                            </div>
                        </div>
                        <div className='ml-3'>
                            <div className='text-light space-light'>Created Events</div>
                        </div>
                        <div className='mr-0 ml-auto'>
                            <img src={arrow} alt=""/>
                        </div>
                    </div>

                        <div   className='menu-item m-3 pointer '>
                            <div className='icon-wrapper'>
                                <div className='center'>
                                    <img src={create_schedule} alt=""/>

                                </div>
                            </div>
                            <div className='ml-3'>
                                <div className='text-light space-light'>Create Schedule</div>
                            </div>
                            <div className='mr-0 ml-auto'>
                                <img src={arrow} alt=""/>
                            </div>
                        </div>
                        <div onClick={handleDeposit} className='menu-item m-3 pointer '>
                            <div className='icon-wrapper'>
                                <div className='center'>
                                    <img src={deposit} alt=""/>

                                </div>
                            </div>
                            <div className='ml-3'>
                                <div className='text-light space-light'>Deposit Fund</div>
                            </div>
                            <div className='mr-0 ml-auto'>
                                <img src={arrow} alt=""/>
                            </div>
                        </div>
                        <div onClick={handleWithdrawal}  className='menu-item m-3 pointer'>
                            <div className='icon-wrapper'>
                                <div className='center'>
                                    <img src={withdraw} alt=""/>

                                </div>
                            </div>
                            <div className='ml-3'>
                                <div className='text-light space-light'>Withdraw Fund</div>
                            </div>
                            <div className='mr-0 ml-auto'>
                                <img src={arrow} alt=""/>
                            </div>
                        </div>


                </div>


            </div>


        </>

    );
}

export default Sidebar;