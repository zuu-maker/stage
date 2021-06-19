import React from 'react';
import home from '../images/home_active.svg'
import message from '../images/message_inactive.svg'
import profile from '../images/profile_inactive.svg'

function MobileNavbar(props) {
    return (
        <div className='mobile-navbar  p-2 shadow-lg'>
            <div className='flex-column text-center flex-grow-1'><img src={home} alt=""/><span>Home</span></div>
            <div className='flex-column text-center flex-grow-1'><img src={message} alt=""/><span>Message</span></div>
            <div className='flex-column text-center flex-grow-1'><img src={profile} alt=""/><span>Profile</span></div>


        </div>
    );
}

export default MobileNavbar;