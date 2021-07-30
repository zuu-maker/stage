import React from 'react'
import {useCollection} from "react-firebase-hooks/firestore"
import { db } from '../firebase/firebase';

function DisplayPicture({chatRoom, receiver}) {
    const [receiverSnap] = useCollection(db.collection("Users").where("email","==",receiver?.email));
    const r = receiverSnap?.docs?.[0]?.data()
    return (
        <div className='user-list-thumb-wrapper'>
            <img src={chatRoom.groupImageUrl || r?.userProfileImageUrl} alt=""/>
        </div>
    )
}

export default DisplayPicture