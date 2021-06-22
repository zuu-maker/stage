import React,{useRef} from 'react';
import dummy from '../../images/dummy.png'
import './eventDetails.css'
import {Link, useHistory} from 'react-router-dom'
import {getRealtimeDoc} from "../../helper/helper";

const UserList = ({user}) => {
    const idRef =useRef();
    const history = useHistory()
    function handleClick(){
        getRealtimeDoc('Users',idRef.current.id)
        history.push(`/user/${idRef.current.id}`)


    }
    return (

                        <div onClick={handleClick} ref={idRef} id={user.userId} className='d-flex pointer user-list-sub-section'>
                            <div className='user-list-thumb-wrapper'>
                                <img src={user.userProfileImageUrl} alt=""/>
                            </div>
                            <div className='ml-3 text-light'>
                                <div className='space-medium'>{user.userName}</div>
                                <div className="space-light">@{user.userName}</div>

                            </div>


                        </div>

    );
};

export default UserList;