import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import firebase from "firebase";
import { db } from "../firebase/firebase";
import { useStateValue } from '../contexts/StateProvider';

function UserContact({id, email, userName, userProfileImageUrl}) {

    const [otherUser,setOtherUser] = useState()
    const [{user,userData}] = useStateValue()
    const history = useHistory()
    const [loading, setLoading] = useState(true);
    const [selected,setSelected] = useState(false)

    const handleMessage = (e) => {

        setSelected(true)
        setLoading(true)
        setOtherUser({
            objectId: id,
            email: email,
            userName: userName,
            userProfileImageUrl: userProfileImageUrl
        })

        //adding chats to db
        if(userData.email && email )
        {
            const data = {
                dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                groupChatName: '',
                groupImageUrl: '',
                isGroupChat: false,
                participants: [
                    {
                        objId: userData.objectId,
                        email: userData.email,
                        userName:userData.userName,
                        userProfileImage:userData.userProfileImageUrl
                    },
                    {
                        objId: id,
                        email: email,
                        userName: userName,
                        userProfileImage: userProfileImageUrl
                    }
                ]
            }
            console.log(data)

            db.collection("ChatRooms").add(data)
                .then(docRef => {
                    docRef.update({chatRoomId: docRef.id})
                    // Redirect to the newly created chatRoom  endpoint
                    db.collection('Users').doc(user.uid).collection('ChatRoomIds').add(
                        {
                            id: docRef.id,
                            isDeleted: false,
                            isDelivered: false,
                        }).then(() => {
                           setLoading(false)
                           history.push(`/messages/${docRef.id}`)
                        }).catch((error) => {
                        console.log(error.message)
                        setLoading(false)
                        })
                })
                .catch((error) => {
                    setLoading(false)
                    console.error("Error adding document: ", error);
                });
        }
    
        setLoading(false)
        setSelected(false)
    }

    return (
        <div onClick={handleMessage} className="user-list">
             <div style={{backgroundColor: selected ? '#2B3038' : 'initial'}}  className='d-flex pointer user-list-sub-section'>
                 <div className='user-list-thumb-wrapper'>
                    <img src={userProfileImageUrl} alt=""/>
                 </div>
                 <div className='ml-3 text-light'>
                    <div className='space-medium'>{userName}</div>
                    <div className="space-light">@{userName}</div>
                </div>
             </div>
        </div>
    )
}

export default UserContact

{/* <div className={`user-list`}>
<div style={{backgroundColor: selected ? '#2B3038' : 'initial'}} onClick={!loading ? handleMessage : null} ref={idRef} id={each.userId || each.objectId} userName={each.userName} userProfileImageUrl={each.userProfileImageUrl} email={each.email} className='d-flex pointer user-list-sub-section'>
    <div className='user-list-thumb-wrapper'>
        <img src={each.userProfileImageUrl} alt=""/>
    </div>
    <div className='ml-3 text-light'>
        <div className='space-medium'>{each.userName}</div>
        <div className="space-light">@{each.userName}</div>

    </div>


</div>

</div> */}
