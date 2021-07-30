import React from 'react';
import home from '../images/home_active.svg'
import message from '../images/message_inactive.svg'
import profile from '../images/profile_inactive.svg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useAuth} from "../contexts/authContext";
import {useChat} from "../contexts/messageContext";
import {useStateValue} from "../contexts/StateProvider";

function MobileNavbar(props) {
    const [{user}] = useStateValue()
    const {setShow} = useChat();


    return (
        <div className='mobile-navbar  p-2 shadow-lg'>
            <Link to={'/events'} className='flex-column text-center flex-grow-1'><img src={home} alt=""/><span>Home</span></Link>
            <Link to={'/messages'} onClick={() => setShow(false)} className='flex-column text-center flex-grow-1'> <img src={message} alt=""/><span>Message</span></Link>
            <Link to={`/user/${user && user.uid}`} className='flex-column text-center flex-grow-1'><img src={profile} alt=""/><span>Profile</span></Link>


        </div>


    );
}

export default MobileNavbar;