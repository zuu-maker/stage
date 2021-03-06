import logo from '../../images/logo.png';
import './header.css';
import  {LoginBtn} from "../modal/modal";
import LoginLink from "../login/loginMobile";
import React, {useEffect, useState} from "react";
import Login from "../login/login";
import {useAuth} from "../../contexts/authContext";
import CurrentUserDropdown from "./currentUserDropdown";
import {Link} from 'react-router-dom'
import {FormProvider} from "../../contexts/formContext";
import {useLoader} from "../../contexts/loaderContext";
import {useUser} from "../../contexts/userContext";
import {useChat} from "../../contexts/messageContext";
import { useStateValue } from '../../contexts/StateProvider';



export default function Header() {
    const [showForm,setShowForm] = useState(false)
    const [showNotification,setShowNotification] = useState(false)
    const {totalNotificationCount,setTotalNotificationCount}= useChat()
    const {loader} =useLoader()

    // const { currentUser,loading } = useAuth()
    // const { user } = useUser()
    const [{user}] = useStateValue()


    useEffect(() =>{
        {
            totalNotificationCount > 0 ?
                setShowNotification(true)
                :
                setShowNotification(false)
        }
    },[])
    return (

        <header className="header">
            
            {loader ? <>
                <div className="loader">
                    <div className="bar">

                    </div>
                </div>
                    </>
                : <div></div>}
            <div className="container">
                <div className="row align-items-center">
                    <div className="col col-sm-12 col-lg-9 ">
                        <nav className="navbar navbar-expand-lg">
                            <Link className="navbar-brand col col-sm-3" href="#">
                                <img alt="" src={logo} width="75"/>
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
                                    <path
                                        d="M492,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,236,492,236z"/>
                                    <path
                                        d="M492,76H20C8.954,76,0,84.954,0,96s8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,76,492,76z"/>
                                    <path
                                        d="M492,396H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20C512,404.954,503.046,396,492,396z"/>
                                </svg>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarToggler">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to='/events'>Home</Link>
                                    </li>
                                    { user && user.email
                                        ? <li className="nav-item">
                                            <Link to='/' className="nav-link" href="#">Events</Link>
                                        </li>
                                        : <li className="nav-item">
                                            <Link className="nav-link" href="#">How does it work</Link>
                                        </li>
                                    }
                                    {user && user.email
                                        ? <li className="nav-item d-flex position-relative">
                                            <Link className="nav-link" to='/messages' href="#">Messages</Link>
                                            <>
                                                {
                                                    totalNotificationCount > 0 &&
                                                    <span style={{display: setShowNotification ? 'inline-flex' : 'none'}}
                                                          className={`message-card-notification text-light mt-1 position-absolute right-0`}>
                    <span
                        className={`mx-auto mt-auto mb-auto`}>{totalNotificationCount}</span>
                </span>

                                                }
                                            </>
                                        </li>

                                        : <></>
                                    }

                                    <li className="nav-item">
                                        <Link className="nav-link" href="#">About us</Link>
                                    </li>

                                    <li className="nav-item d-lg-none">
                                        <Link className="nav-link" href="#">Contact Us</Link>
                                    </li>
                                    <li className="nav-item d-lg-none">
                                        <LoginLink/>
                                        {/*<Link onClick={() => setShowForm(true)} className="nav-link" href="#">Login</Link>*/}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="col col-md-3 d-none d-lg-flex header_btn_wrapper">
                        <Link href="#" className="btn btn-clear">Contact Us</Link>
                        { user?.uid
                            ? <CurrentUserDropdown />
                            :<LoginBtn/>
                        }



                    </div>

                </div>
            </div>
        </header>
    );
}
