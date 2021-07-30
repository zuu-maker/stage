import React from 'react'
import {useCollection} from "react-firebase-hooks/firestore"
import { db } from '../firebase/firebase';

function DisplayName({groupName, receiver}) {

    console.log(receiver)
    const [receiverSnap] = useCollection(db.collection("Users").where("email","==",receiver?.email));
    const r = receiverSnap?.docs?.[0]?.data()
    console.log(r?.userName);
    return (
        <div className='space-medium'>{groupName ? groupName : r?.userName}</div>
    )
}

export default DisplayName