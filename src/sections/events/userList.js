import React, {useRef, useState} from 'react';
import dummy from '../../images/dummy.png'
import './eventDetails.css'
import {Link, useHistory} from 'react-router-dom'
import {getRealtimeDoc} from "../../helper/helper";
import {db} from "../../firebase/firebase";
import firebase from "firebase";
import {useStateValue} from "../../contexts/StateProvider";

const UserList = ({user,onClickFunction}) => {
    const [selected,setSelected] = useState(false)
    const idRef =useRef();
    const history = useHistory()
    const [otherUser,setOtherUser] = useState()
    const [loading,setLoading] = useState(false)
    const [{userData }] = useStateValue();


    //Send a message
    function handleSelect(e){
        {
            selected
                ?setSelected(false)

                :setSelected(true)
        }

    }
    function handleClick(){
        getRealtimeDoc('Users',idRef.current.id)
        history.push(`/user/${idRef.current.id}`)


    }
    return (

                        <div style={{backgroundColor: selected ? '#2B3038' : 'initial'}}  ref={idRef} id={user.userId || user.objectId} userName={user.userName} userProfileImageUrl={user.userProfileImageUrl} email={user.email} className='d-flex pointer w-100 user-list-sub-section'>
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