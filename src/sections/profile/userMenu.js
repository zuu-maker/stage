import React, {useEffect, useState} from 'react';
import dummy from "../../images/dummy.png";
import edit from "../../images/edit.png";
import rank from "../../images/rank.svg";
import schedule from "../../images/created_schedule.svg";
import join_event from "../../images/join_event.svg";
import create_event from "../../images/created_event.svg";
import create_schedule from "../../images/created_schedule.svg";
import deposit from "../../images/deposit_fund.svg";
import withdraw from "../../images/withdraw_fund.svg";
import arrow from "../../images/arrow right.svg";
import './userProfile.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useParams, useHistory
} from "react-router-dom";
import Graph from "./graph";
import Card from "../events/card";
import {useAuth} from "../../contexts/authContext";
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {db, realDB} from "../../firebase/firebase";
import defaultProfilePhoto from '../../images/default_profile_photo.svg';
import {EditProfileBtn} from "../modal/modal";
import {useUser} from "../../contexts/userContext";
import {useLoader} from "../../contexts/loaderContext";


function UserMenu({user}) {
    const {currentUser,joinedEvents, createdEvents} = useAuth();
    let params = useParams();
    const userId = params.id;
    // const {joinedEvents, createdEvents} = useUser();
    const {setLoader} = useLoader();
    let userJoinedEventsList = [];
    let joinedEventsList = [];
    const history = useHistory()

    const routes = [
        {
            path: "/user/:id",
            exact: true,
            sidebar: () => <></>,

            main: () => <div className='flex-column flex-grow-1'>
                <div className='lg-view'>
                    <Graph />
                </div>
                <div className='grid-container'>
                    {joinedEvents ? joinedEvents?.map(event => {
                        return (
                            <>

                                <Card event={event}/>
                            </>
                        )
                    }) :<>
                        <Card event={''}/>
                        <Card event={''}/>
                    </> }
                </div>


            </div>
        },
        {
            path: "/user/:id/joined-events",
            exact: true,
            sidebar: () => <></>,

            main: () => <div className='flex-column flex-grow-1'>

                <div className='grid-container'>
                    {joinedEvents ? joinedEvents?.map(event => {
                        return (
                            <>

                                <Card event={event}/>
                            </>
                        )
                    }) :<>
                        <Card event={''}/>
                        <Card event={''}/>
                    </> }
                </div>


            </div>
        },
        {
            exact: true,

            path: "/user/:id/created-events",
            sidebar: () => <></>,
            main: () => <div className='grid-container'>
                {createdEvents ? createdEvents?.map(event => {
                    return (
                        <>

                            <Link to={`/eventDetails/${event.id}`}><Card event={event}/></Link>
                        </>
                    )
                }) :<>
                    <p className={`text-light d-block mx-auto text-center`}>No available created events</p>
                </> }
            </div>
        },
        {
            exact: true,

            path: "/user/:id/create-schedule",
            sidebar: () => <></>,
            main: () => <div className='grid-container'>

            </div>
        },
        {
            exact: true,

            path: "/user/:id/deposit",
            sidebar: () => <></>,
            main: () => <div className='grid-container'>

            </div>
        },
        {
            exact: true,

            path: "/user/:id/withdraw",
            sidebar: () => <></>,
            main: () => <div className='grid-container'>

            </div>
        }

    ];

    // const handleJoinedEvents = () =>{
    //     setLoader(true)
    //     getRealtimeChild('Participants', 'userId', currentUser.uid).on("child_added", function (snapshot) {
    //         userJoinedEventsList.push(snapshot.val())
    //
    //
    //     })
    //     console.log(userJoinedEventsList)
    //     userJoinedEventsList.forEach((eventJoined) => {
    //         // realDB.ref('Events'+'/'+eventJoined.EventId).on('value',(snapshot) =>{
    //         //     console.log(snapshot)
    //         //     console.log(snapshot.val())
    //         // })
    //         getRealtimeDoc('Events', eventJoined.EventId).then((snapshot) => {
    //
    //             joinedEventsList.push(snapshot.val())
    //         })
    //
    //     })
    //     console.log(joinedEventsList)
    //     {joinedEvents ? setJoinedEvents([...joinedEvents,joinedEventsList]) : setJoinedEvents(joinedEventsList)}
    //
    //     console.log(joinedEvents)
    //     setLoader(false)
    //     history.push(`/user/${currentUser.uid}/joined-events`)
    // }



        return (
            <>
                <Router>

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

                                        <img src={currentUser.photoURL} alt=""/>

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
                                <Graph/>

                            </div>

                        </div>
                        <div className='menu-options'>
                            <Link  to={`/user/${currentUser.uid}/joined-events`}>
                                <div   className=' m-3 pointer  menu-item'>
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
                            </Link>
                            <Link to={`/user/${currentUser.uid}/created-events`}>
                                <div className='menu-item m-3 pointer '>
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
                            </Link>
                            <Link to={`/user/${currentUser.uid}/create-schedule`}>
                                <div className='menu-item m-3 pointer '>
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
                            </Link>
                            <Link to={`/user/${currentUser.uid}/deposit`}>
                                <div className='menu-item m-3 pointer '>
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
                            </Link>
                            <Link to={`/user/${currentUser.uid}/withdraw`}>
                                <div className='menu-item m-3 pointer'>
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
                            </Link>


                        </div>


                    </div>

                    <Switch>
                        {routes.map((route, index) => (
                            // You can render a <Route> in as many places
                            // as you want in your app. It will render along
                            // with any other <Route>s that also match the URL.
                            // So, a dashboard or breadcrumbs or anything else
                            // that requires you to render multiple things
                            // in multiple places at the same URL is nothing
                            // more than multiple <Route>s.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.sidebar/>}
                            />
                        ))}
                    </Switch>

                    <div>
                        <Switch>
                            {routes.map((route, index) => (
                                // Render more <Route>s with the same paths as
                                // above, but different components this time.
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main/>}
                                />
                            ))}
                        </Switch>
                    </div>
                </Router>
            </>

        );
    }

    export default UserMenu;