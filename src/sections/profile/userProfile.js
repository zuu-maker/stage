import React from 'react';
import './userProfile.css'
import Header from "../header/header";
import EventSection from "../events/eventSection";
import UserList from "../events/userList";
import Graph from "./graph";
import Card from "../events/card";
import UserMenu from "./userMenu";
import basketball from "../../images/basketball.png";
import dummy from "../../images/dummy.png";

function UserProfile(user) {
    return (
        <>
            <Header/>
            <div className='container user d-flex'>
                <UserMenu/>




            </div>
        </>
    );
}

export default UserProfile;