import React from 'react';
import Header from "../header/header";
import UserMenu from "./userMenu";
import OtherUserMenu from "./otherUserMenu";
import Card from "../events/card";

function OtherUser(props) {
    return (
        <>
            <Header/>
            <div className='container other-user  d-flex'>
                <OtherUserMenu/>
                <div className='flex-column'>
                    <h3 className='text-light pl-4'>Activity</h3>
                    <div className='grid-container'>
                        <Card event={''}/>
                        <Card event={''}/>
                        <Card event={''}/>
                        <Card event={''}/>


                    </div>

                </div>


            </div>
        </>
    );
}

export default OtherUser;