import React from 'react';
import edit from "../../images/edit.png";
import dummy from "../../images/dummy.png";
import rank from "../../images/rank.svg";
import follow from "../../images/follow.svg";
import message from "../../images/message_green.svg";
import {Link} from "react-router-dom";
import arrow from "../../images/arrow right.svg";


function OtherUserMenu(props) {
    return (
        <div className='d-flex flex-column text-center card-body user-side-bar'>
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


                <div className='mt-5 mb-4 text-light'>
                    <div className='space-medium f-18' >Display Name</div>
                    <div className="space-light ">@username</div>

                </div>

            </div>
            <div className='p-3 d-flex center  followers-container text-light mb-4'>
                <div className='flex-column border-right d-inline-flex text-center flex-grow-1 follow-stats'>
                    <span>100K</span>
                    <span>Followers</span>
                </div>
                <div className='flex-column d-inline-flex text-center flex-grow-1 follow-stats'>
                    <span>100</span>
                    <span>Following</span>
                </div>

            </div>
            <div className='d-flex   center other-user-btn'>
                <button className='btn flex-grow-1 m-2 btn-clear' style={{backgroundImage: `url(${message})`}}>Message</button>
                <button className='btn flex-grow-1 m-2' style={{backgroundImage: `url(${follow})`}}>Follow</button>
            </div>



        </div>

    );
}

export default OtherUserMenu;