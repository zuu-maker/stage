import React, {useRef, useState} from 'react';
import dummy from '../../images/dummy.png'
import './eventDetails.css'
import {Link, useHistory} from 'react-router-dom'
import {getRealtimeDoc} from "../../helper/helper";
import {db} from "../../firebase/firebase";
import firebase from "firebase";
import {useStateValue} from "../../contexts/StateProvider";

const UserList = ({user,canBeSelected}) => {
    const [selected,setSelected] = useState(false)
    const idRef =useRef();
    const history = useHistory()
    const [otherUser,setOtherUser] = useState()
    const [loading,setLoading] = useState(false)
    const [{userData,selectedParticipants },dispatch] = useStateValue();


    //Send a message
    function handleSelect(e){
        setLoading(true)

        if(selected){

            const index = selectedParticipants.findIndex(participant => participant.objId === idRef.current.id)
            if(index >= 0){
                selectedParticipants.splice(index,1)
            }
            
            dispatch({
                type:"REMOVE_UNSELECTED_PARTICIPANTS",
                selectedParticipants
            })

            setSelected(false)

        }
        else{


            setOtherUser({
                objectId: idRef.current.id,
                email: idRef.current.getAttribute('email'),
                userName: idRef.current.getAttribute('userName'),
                userProfileImageUrl: idRef.current.getAttribute('userProfileImageUrl')
            })

            //adding chats to db
            console.log(otherUser)


                const data = {
                    dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                    groupChatName: '',
                    groupImageUrl: '',
                    isGroupChat: false,
                    // users: [user.email,otherUser.email],
                    participants: [
                        {
                            objId: userData.objectId,
                            email: userData.email,
                            userName:userData.userName,
                            userProfileImage:userData.userProfileImageUrl
                        },
                        {
                            objId: otherUser?.objectId,
                            email: otherUser?.email,
                            userName:otherUser?.userName,
                            userProfileImage:otherUser?.userProfileImageUrl
                        }
                    ]
                }
                    dispatch({
                        type:"SET_SELECTED_PARTICIPANTS",
                        selectedParticipants: {
                            objId: idRef.current.id,
                            email: idRef.current.getAttribute('email'),
                            userName: idRef.current.getAttribute('userName'),
                            userProfileImageUrl: idRef.current.getAttribute('userProfileImageUrl')
                        }
                    })
                    setSelected(true)








    }
    }
    function handleClick(){
        getRealtimeDoc('Users',idRef.current.id)
        history.push(`/user/${idRef.current.id}`)


    }
    return (
        <>

        {canBeSelected ?
            <>
                <div style={{backgroundColor: selected ? '#2B3038' : 'initial'}} onClick={handleSelect} ref={idRef} id={user.userId || user.objectId} userName={user.userName} userProfileImageUrl={user.userProfileImageUrl} email={user.email} className='d-flex pointer w-100 user-list-sub-section'>
                    <div className='user-list-thumb-wrapper'>
                        <img src={user.userProfileImageUrl} alt=""/>
                    </div>
                    <div className='ml-3 text-light'>
                        <div className='space-medium'>{user.userName}</div>
                        <div className="space-light">@{user.userName}</div>

                    </div>


                </div>

            </>
        :
        <>
            <div style={{backgroundColor: selected ? '#2B3038' : 'initial'}}  ref={idRef} id={user.userId || user.objectId} userName={user.userName} userProfileImageUrl={user.userProfileImageUrl} email={user.email} className='d-flex pointer w-100 user-list-sub-section'>
                <div className='user-list-thumb-wrapper'>
                    <img src={user.userProfileImageUrl} alt=""/>
                </div>
                <div className='ml-3 text-light'>
                    <div className='space-medium'>{user.userName}</div>
                    <div className="space-light">@{user.userName}</div>

                </div>


            </div>

        </>

        }
            </>

    );
};

export default UserList;