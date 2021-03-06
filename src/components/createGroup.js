import React, {useEffect, useRef, useState} from 'react';
import {
    getDocWithRef,
    getFirestoreDocument,
    getRealtimeChild,
    updateDocument,
    updateFirestoreDocument
} from "../helper/helper";
import {useAuth} from "../contexts/authContext";
import UserList from "../sections/events/userList";
import {useChat} from "../contexts/messageContext";
import firebase from "firebase";
import {db, storage} from "../firebase/firebase";
import group from "../images/group.png";
import password from "../images/password.svg";
import {useLoader} from "../contexts/loaderContext";
import {useHistory} from "react-router-dom";
import { useStateValue } from '../contexts/StateProvider';
import {useCollection} from "react-firebase-hooks/firestore";
import Search from "../sections/search/search";
import Icon from "./icon";
import '../sections/message/message.css'
import UserContact from './UserContact';

function CreateGroup(props) {
    const [{user,selectedParticipants,userData},dispatch] = useStateValue()
    const [contacts,setContacts] = useState([])
    const [participants,setParticipants] = useState([])
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(true);
    const hiddenFileInput = React.useRef(null);
    const [showSelectUsers,setShowSelectUsers] = useState(false)
    const [showAddGroupInfo,setAddGroupInfo] = useState(false)
    const [totalContacts,setTotalContacts] = useState(0)
    const [selected,setSelected] = useState(false)
    const refArray = React.useRef([]);

    const idRef =useRef();
    const participantRef =useRef([]);
    const [otherUser,setOtherUser] = useState()

    const history = useHistory()
    const contactList = []
    const participantsList = []


    const handleMessage = async (e) => {
        setSelected(true)
        setLoading(true)

        setOtherUser({
            objectId: idRef.current.id,
            email: idRef.current.getAttribute('email'),
            userName: idRef.current.getAttribute('userName'),
            userProfileImageUrl: idRef.current.getAttribute('userProfileImageUrl')
        })

        //adding chats to db
        console.clear()
        console.log(otherUser)
        // if(userData.email && otherUser?.email )
        // {
        //     const data = {
        //         dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        //         groupChatName: '',
        //         groupImageUrl: '',
        //         isGroupChat: false,
        //         // users: [user.email,otherUser.email],
        //         participants: [
        //             {
        //                 objId: userData.objectId,
        //                 email: userData.email,
        //                 userName:userData.userName,
        //                 userProfileImage:userData.userProfileImageUrl
        //             },
        //             {
        //                 objId: otherUser.objectId,
        //                 email: otherUser.email,
        //                 userName:otherUser.userName,
        //                 userProfileImage:otherUser.userProfileImageUrl
        //             }
        //         ]
        //     }
        //     console.log(data)

        //     db.collection("ChatRooms").add(data)
        //         .then(docRef => {
        //             docRef.update({chatRoomId: docRef.id})
        //             // Redirect to the newly created chatRoom  endpoint
        //             db.collection('Users').doc(user.uid).collection('ChatRoomIds').add(
        //                 {
        //                     id: docRef.id,
        //                     isDeleted: false,
        //                     isDelivered: false,
        //                 }).then(() => {
        //                 setLoading(false)

        //                 history.push(`/messages/${docRef.id}`)
        //             }).catch((error) => {
        //                 console.log(error.message)
        //                 setLoading(false)

        //             })

        //         })
        //         .catch(function (error) {
        //             setLoading(false)

        //             console.error("Error adding document: ", error);
        //         });
        // }
        // else if(chatExists(otherUser.email)){
        //     setLoading(false)
        //     history.push(`/messages`)
        // }






        // // Chatroom Data
        // var data = {
        //     dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        //     groupChatName: '',
        //     groupImageUrl: '',
        //     isGroupChat: false,
        //     participants: [{objId : user.uid,userName: user.displayName,email: user.email,userProfileImage:user.userProfileImageUrl},{objId : otherUser.userId,userName: otherUser.userName,email: otherUser.email,userProfileImage: otherUser.userProfileImageUrl}]
        // }
        // //Show Loader
        setLoading(false)
        setSelected(false)



    }
    const handleCreateGroupChat = async (e) => {
        setLoading(true)
        e.preventDefault()


        if(selectedParticipants.length > 0 )
        {
            const data = {
                dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                groupChatName: e.target.groupChatName.value,
                groupImageUrl: '',
                isGroupChat: true,
                // users: [user.email,otherUser.email],
                participants: [...selectedParticipants,{
                    objId: user.uid,
                    email: user.email,
                    userName: userData?.userName,
                    userProfileImageUrl: userData?.userProfileImageUrl
                }]
            }
            console.log(data)

            db.collection("ChatRooms").add(data)
                .then(docRef => {
                    docRef.update({chatRoomId: docRef.id})
                    // Redirect to the newly created chatRoom  endpoint
                    data.participants.map(each =>{
                        db.collection('Users').doc(each.objId).collection('ChatRoomIds').add(
                            {
                                id: docRef.id,
                                isDeleted: false,
                                isDelivered: true,
                            }).then(() => {
                            dispatch({
                                type:"SET_SELECTED_PARTICIPANTS",
                                selectedParticipants: {}
                            })
                            setLoading(false)

                            history.push(`/messages/${docRef.id}`)
                        })
                            .catch((error) => {
                                console.log(error.message)
                                setLoading(false)

                            })
                    })

                })
                .catch(function (error) {
                    setLoading(false)

                    console.error("Error adding document: ", error);
                });
        }






        setLoading(false)



    }
    useEffect(() =>{

        if(userData.followedUsersIds){
            userData.followedUsersIds.map((each) =>{
                db.collection('Users').doc(each).get()
                // getFirestoreDocument('Users','objectId',each)
                    .then(doc =>{
                        contactList.push({...doc.data(), id: doc.id})
                        setLoading(false)
                        setParticipants(contactList)
                        setTotalContacts(contactList.length)
                        var contactsGrouped = contactList.reduce(function(contactList, userObj) {

                            var contactLetterGroup = contactList.filter(function(list) {
                                return list.letter == userObj.userName;
                            });
                            if (contactLetterGroup.length > 0) {
                                contactLetterGroup[0].name.push(userObj);
                            } else {
                                contactList.push({
                                    letter: userObj.userName[0].toUpperCase(),
                                    user: [userObj]
                                });
                            }
                            return contactList;
                        }, [])
                            .sort(function(a, b) {
                                return b.letter - a.letter;
                            })
                        setContacts(contactsGrouped.reverse())

                        console.log(contacts);
                    })
                    .catch(e =>{
                        console.log(e.message)
                        setLoading(false)
                    })
            })
        }


    },[])


    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (event) => {
        setFile('')
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        setFile(event.target.files[0])
        const fileUploaded = event.target.files[0];
        console.log(file)
    };
    const handleSelect = (e) =>{
        // const participantObj = {
        //     objId: e.target.getAttribute('id'),
        //     userName:e.target.getAttribute('userName'),
        //     email:e.target.getAttribute('email')
        //
        // }
        // console.log(participantRef.current.children[0].getAttribute('id'))
        // console.log(participantObj)
        {
            selected
                ?setSelected(false)

                :setSelected(true)
        }
        if(selected){
            // setSelectedParticipants([participantObj,...selectedParticipants])

        }
        // console.log(selectedParticipants)

    }

    const handleSelectParticipants = async (index) => {
        // e.preventDefault()
        console.log(refArray.current[index].getAttribute('index'));
        console.log(refArray.current[index]);
        console.log(refArray)


        participants.map((each) => {
            document.querySelectorAll(`[name=${each.userName}]:checked`).forEach((node) => {
                // console.log(node)

                const data = {
                    userName: each.userName,
                    email: node.getAttribute('email'),
                    objectId: node.getAttribute('userId'),
                    userProfileImage: each.userProfileImageUrl

                }
                console.log(data)
                // participantsList.push(data)
                // invitationList.push(node.getAttribute('userId'))
                // usersList.push(node.getAttribute('email'))
            })
        })
    }


    return (
        <>
            {!showSelectUsers && !showAddGroupInfo && <div id={`create-group `} className={`create-group`}>
                <div className={`d-flex text-light`}>

                    <span className={`flex-grow-1`}> </span>
                    <div className={`flex-grow-1`}>
                        <h5>New Chat</h5>
                    </div>
                    <span className={`flex-grow-1`}>Cancel</span>
                </div>

                <Search props={'#2B3038'}/>
                <div onClick={()=>{ setShowSelectUsers(true)}} className={`d-flex align-items-center mb-4 text-light`}>
                    <Icon props={{backgroundColor: "#2B3038", image: group}}/>
                    <span className={`ml-3`}>Create Group</span>
                </div>

                {!loading && contacts ? contacts?.map(obj => {
                    return (<>
                            <div className={`sub-heading`}>
                                <span className={`ml-3 `}>{obj.letter}</span>
                            </div>
                            {obj.user.map(each => {
                                return (
                                    <UserContact
                                       key={each.objectId}
                                       id={each.userId || each.objectId} 
                                       userName={each.userName}
                                       userProfileImageUrl={each.userProfileImageUrl}
                                       email={each.email}
                                    />
                                     
                                )
                            })}
                        </>


                    )
                }) : <></>}


            </div>}
            { showSelectUsers && !showAddGroupInfo && <div style={{height: showSelectUsers ? '100%' : '0%'}} className={`d-flex create-group flex-column`}>
                <div className={`d-flex text-light mb-4`}>
                    <span onClick={() => {
                        setShowSelectUsers(false);
                        setAddGroupInfo(false)
                    }} className={`flex-grow-1`}>Cancel</span>
                    <div className={`flex-grow-1`}>
                        <h5>Add Participants</h5>
                        <small>0/{totalContacts}</small>
                    </div>
                    <span onClick={() => {
                        setShowSelectUsers(false);
                        setAddGroupInfo(true)
                    }} className={`flex-grow-1`}>Next</span>
                </div>

                {!loading && contacts ? contacts.map(obj => {
                    return (<>
                            <div className={`sub-heading`}>
                                <span className={`ml-3 `}>{obj.letter}</span>
                            </div>
                            {obj.user.map((each, index) => {
                                return (

                                   
                                    <UserList canBeSelected={true} user={each} key={each.objectId}/>

                                // <div style={{backgroundColor: selected ? '#2B3038' : 'initial'}}
                                //          userName={each.userName}  index={index}
                                //          className={` d-flex align-items-center w-100`}>
                                //
                                //
                                //         <div className={`form-group ml-auto text-right`}>
                                //
                                //
                                //             <input type="checkbox" userId={each.objectId} email={each.email}
                                //                    id={each.userName} name={each.userName}/>
                                //             <label htmlFor={each.userName}></label>
                                //
                                //         </div>
                                //     </div>
                                )
                            })}
                        </>


                    )
                }) : <></>}
            </div>}
            { !showSelectUsers && showAddGroupInfo &&  <form onSubmit={handleCreateGroupChat} className={`d-flex flex-column`}>
                   <div className={`d-flex text-light mb-4`}>

                       <span onClick={()=>{ setShowSelectUsers(true);setAddGroupInfo(false)}} className={`flex-grow-1`}>Cancel</span>
                       <div className={`flex-grow-1`}>
                           <h5>New Group</h5>
                       </div>
                       <button type={`submit`}  className={`flex-grow-1 text-btn`}>Create</button>
                   </div>
                        <div className="input-group">
                            <div className={`ml-5 mb-3 d-flex text-light align-items-center`}>
                                <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                                     viewBox="0 0 450 450">
                                    <defs>
                                        <clipPath id="clip-path">
                                            <rect id="Rectangle_15" data-name="Rectangle 15" width="150" height="150"
                                                  transform="translate(230 500)" fill="#18ff00"/>
                                        </clipPath>
                                    </defs>
                                    <g id="camera" transform="translate(-80 -350)">
                                        <g id="Rectangle_14" data-name="Rectangle 14" transform="translate(80 350)"
                                           fill="#13161a" stroke="#18ff00" stroke-width="5" stroke-dasharray="20">
                                            <rect width="450" height="450" rx="225" stroke="none"/>
                                            <rect x="2.5" y="2.5" width="445" height="445" rx="222.5" fill="none"/>
                                        </g>
                                        <g id="Mask_Group_9" data-name="Mask Group 9" clip-path="url(#clip-path)">
                                            <g id="camera-line_11_" data-name="camera-line (11)" transform="translate(230 500)">
                                                <path id="Path_16" data-name="Path 16" d="M0,0H150V150H0Z" fill="none"/>
                                                <path id="Path_17" data-name="Path 17"
                                                      d="M61.425,31.25l-12.5,12.5H25v75H125v-75H101.075l-12.5-12.5ZM56.25,18.75h37.5l12.5,12.5h25a6.25,6.25,0,0,1,6.25,6.25V125a6.25,6.25,0,0,1-6.25,6.25H18.75A6.25,6.25,0,0,1,12.5,125V37.5a6.25,6.25,0,0,1,6.25-6.25h25ZM75,112.5a34.375,34.375,0,1,1,34.375-34.375A34.375,34.375,0,0,1,75,112.5ZM75,100A21.875,21.875,0,1,0,53.125,78.125,21.875,21.875,0,0,0,75,100Z"
                                                      fill="#18ff00"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span className={`ml-5`}>{file && file.name}</span>

                            </div>

                            <input
                                name={`photo`}
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{display: 'none'}}

                            />

                        </div>

                        <input style={{backgroundImage: `url(${group})`}} placeholder={`Group name`} name={`groupChatName`} type="text"/>


                </form>}
        </>
    );
}

export  default CreateGroup;