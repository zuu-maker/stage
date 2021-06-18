import React from 'react';
import basketball from "../../images/basketball.png";
import dummy from "../../images/dummy.png";
import Header from "../header/header";
import EventSection from "./eventSection";
import UserList from "./userList";

const EventDetails = (event) => {
    return (
        <>
            <Header/>
            <div className='container event-details d-flex'>
                <EventSection/>
                <UserList/>


            </div>
        </>

    );
};

export default EventDetails;