import React from 'react';
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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Graph from "./graph";
import Card from "../events/card";

const routes = [
    {
        path: "/user/dashboard",
        exact: true,
        sidebar: () => <></>,

        main: () => <div className='flex-column flex-grow-1'>
            <Graph/>
            <div className='grid-container'>
                <Card event={''}/>
                <Card event={''}/>

            </div>



        </div>
    },
    {
        path: "/user/joined-events",
        exact: true,
        sidebar: () => <></>,

        main: () =>             <div className='grid-container'>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
        </div>
    },
    {
        path: "/user/created-events",
        sidebar: () => <></>,
        main: () =>             <div className='grid-container'>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
        </div>
    },
    {
        path: "/user/create-schedule",
        sidebar: () => <></>,
        main: () =>             <div className='grid-container'>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
        </div>
    },
    {
        path: "/user/deposit",
        sidebar: () => <></>,
        main: () =>             <div className='grid-container'>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
        </div>
    },
    {
        path: "/user/withdraw",
        sidebar: () => <></>,
        main: () =>             <div className='grid-container'>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
            <Card event={''}/>
        </div>
    }

];

function UserMenu(props) {
    return (
        <>
        <Router>

                <div className='d-flex flex-column card-body user-side-bar'>
                    <div className=' ml-auto  menu-icon-wrapper text-center '>
                        <img src={edit} alt=""/>

                    </div>
                    <div className='text-center card-body user-info-container'>

                        <div className='position-relative'>
                            <div className='mx-auto d-block user-profile-pic-wrapper'>
                                <img src={dummy} alt=""/>
                            </div>
                            <div className='badge-wrapper'>
                                <img src={rank} alt=""/>
                                <span className='ml-2'>235</span>
                            </div>
                        </div>


                        <div className='mt-3 text-light'>
                            <div className='space-medium f-18' >Display Name</div>
                            <div className="space-light ">@username</div>

                        </div>

                    </div>
                    <div className='menu-options'>
                        <Link to='/user/joined-events'><div className='d-flex m-3 pointer align-items-center flex-grow-1'>
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
                        </div></Link>
                        <Link to='/user/created-events'><div className='d-flex m-3 pointer align-items-center flex-grow-1'>
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
                        </div></Link>
                        <Link to='/user/create-schedule'><div className='d-flex m-3 pointer align-items-center flex-grow-1'>
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
                        </div></Link>
                        <Link to='/user/deposit'><div className='d-flex m-3 pointer align-items-center flex-grow-1'>
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
                        </div></Link>
                        <Link to='/user/withdraw'><div className='d-flex m-3 pointer align-items-center flex-grow-1'>
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
                        </div></Link>


                    </div>


                </div>

                    <Switch>
                        {routes.map((route, index) => (
                            // You can render a <Route> in as many places
                            // as you want in your app. It will render along
                            // with any other <Route>s that also match the URL.
                            // So, a sidebar or breadcrumbs or anything else
                            // that requires you to render multiple things
                            // in multiple places at the same URL is nothing
                            // more than multiple <Route>s.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.sidebar />}
                            />
                        ))}
                    </Switch>

                <div >
                    <Switch>
                        {routes.map((route, index) => (
                            // Render more <Route>s with the same paths as
                            // above, but different components this time.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))}
                    </Switch>
            </div></Router>
            </>

    );
}

export default UserMenu;