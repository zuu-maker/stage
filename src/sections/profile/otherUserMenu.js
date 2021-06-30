import React, {useEffect} from 'react';
import rank from "../../images/rank.svg";
import follow from "../../images/follow.svg";
import back_arrow from "../../images/back_arrow.svg";
import message from "../../images/message_green.svg";
import {Link, useHistory, useParams} from "react-router-dom";
import arrow from "../../images/arrow right.svg";
import Graph from "./graph";
import {getRealtimeDoc, pushFireStoreData} from "../../helper/helper";
import Card from "../events/card";


function OtherUserMenu({user}) {
    const history = useHistory()

    const handleMessage =  (e) => {
         // await pushFireStoreData('ChatRooms')
        const id =1
        history.push(`/message/${id}`)

    }
    return (
        <div className='d-flex user-menu-container'>
        <div className='d-flex flex-column text-center card-body user-side-bar'>
            <div className='sm-view text-left w-100 back-arrow'>
                <img src={back_arrow} alt=""/>
            </div>
            <div className='text-center  user-info-container'>

                <div className='position-relative d-flex align-items-center '>
                    <div className='sm-view'>
                        <div className=' other-user-btn'>
                            <button className='btn flex-grow-1 m-2 btn-clear' style={{backgroundImage: `url(${message})`}}></button>

                        </div>
                    </div>


                    <div className='mx-auto user-profile-pic-wrapper' style={{backgroundImage: `url(${user.userProfileImageUrl})`}}>
                        {/*<img src={user.userProfileImageUrl} alt=""/>*/}
                    </div>
                    <div className='badge-wrapper'>
                        <img src={rank} alt=""/>
                        <span className='ml-2'>235</span>
                    </div>
                    <div className='sm-view'>
                        <div className=' other-user-btn'>
                            <button className='btn flex-grow-1 m-2' style={{backgroundImage: `url(${follow})`}}></button>

                        </div>
                    </div>


                </div>


                <div className='mt-5 mb-4 text-light'>
                    <div className='space-medium f-18' >{user.userName}</div>
                    <div className="space-light ">@{user.userName}</div>

                </div>
                <div className='sm-view'>
                    <Graph />
                </div>


            </div>
            <div className='p-3  center  followers-container text-light mb-4'>
                <div className='flex-column border-right d-inline-flex text-center flex-grow-1 follow-stats'>
                    <span>100K</span>
                    <span>Followers</span>
                </div>
                <div className='flex-column d-inline-flex text-center flex-grow-1 follow-stats'>
                    <span>100</span>
                    <span>Following</span>
                </div>

            </div>
            <div className='lg-view'>
            <div className='   center other-user-btn'>
                <button onClick={handleMessage} className='btn flex-grow-1 m-2 btn-clear' style={{backgroundImage: `url(${message})`}}>Message</button>
                <button className='btn flex-grow-1 m-2' style={{backgroundImage: `url(${follow})`}}>Follow</button>
            </div>
            </div>



        </div>
            <div className='grid-container'>
                <Card event={''}/>
                <Card event={''}/>
            </div>


        </div>

    );
}

export default OtherUserMenu;