import React, {useEffect,useState} from 'react';
import Header from "../header/header";
import UserMenu from "./userMenu";
import OtherUserMenu from "./otherUserMenu";
import Card from "../events/card";
import {useParams} from "react-router-dom";
import {getDoc, getRealtimeDoc} from "../../helper/helper";
import {useUser} from "../../contexts/userContext";

function OtherUser() {
    const {otherUser, setOtherUser} = useUser();
    let params = useParams();

    useEffect(async ()=>{
        await getDoc('Users','userId',params.id).then(function(snapshot) {
            const data = snapshot.val();
            setOtherUser(data)
            console.log(data)
        });
        console.log(otherUser)




    },[])
    return (
        <>
            <Header/>
            <div className='container other-user  d-flex'>
                <OtherUserMenu user={otherUser}/>
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