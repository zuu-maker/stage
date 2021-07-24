import React, {useEffect, useState} from 'react';
import {getRealtimeChild, updateDocument, updateFirestoreDocument} from "../helper/helper";
import {useAuth} from "../contexts/authContext";
import SearchItem from "../sections/search/searchItem";
import UserList from "../sections/events/userList";
import {useChat} from "../contexts/messageContext";
import firebase from "firebase";
import {db, storage} from "../firebase/firebase";
import group from "../images/group.png";
import password from "../images/password.svg";
import {useLoader} from "../contexts/loaderContext";
import {useHistory} from "react-router-dom";
import { useStateValue } from '../contexts/StateProvider';

function CreateGroup(props) {
    const [{user}] = useStateValue() 
    // const {currentUser} = useAuth();
    const [createdEvents,setCreatedEvents] = useState([]);
    const {participants,setParticipants} = useChat();
    let eventsList = [];
    let invitationList = [];
    let usersList = []
    const [file, setFile] = useState('');
    const hiddenFileInput = React.useRef(null);
    const {setLoader,loader} = useLoader();
    const {setChatRoom,chatList,setChatList,setRecent,recent} =useChat();
    const history = useHistory()




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

    const handleSubmit = async (e) => {
        e.preventDefault()
        // alert("hey!!!")
        // invitationList=[]
        // usersList = []
        participants.map((p) =>{
            document.querySelectorAll(`[name=${p.userName}]:checked`).forEach((node) =>{
                console.log(node);
                usersList.push(node.getAttribute('email'))
                invitationList.push(node.getAttribute('userId') )
            })
        })
        console.log(invitationList)


        //Chatroom Data
        var formData = {
            dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            groupChatName: e.target.groupName.value,
            isGroupChat: true,
            participants: invitationList,
            users:usersList
        }

        const otherFormData = {
          
                counter: 0,
                date: Date.now(),
                groupChatName: e.target.groupName.value,
                lastMessage: " ",
                membersToPush:invitationList,
                members:invitationList,
                type:'group'

                // fromUserId: currentUser.uid,
                // fromUserName: currentUser.displayName,
                // fromUserProfileimageUrl: currentUser.photoURL,
                // date: Date.now(),
              
                // chatRoomID: params.id,
        }
        //Show Loader
        setLoader(true)

        //Recent Chats data
        var recentData = {
            // chatRoomID: params.id,
            counter: 0,
            date: Date.now(),
            lastMessage: '',
            membersToPush: invitationList,
            members: invitationList,
            type: 'group',
            userId: user.uid,
            withUserName: e.target.groupName.value,
            withUserUserID: '',
            // dateTime : firebase.firestore.FieldValue.serverTimestamp()
        }

        
        db.collection("chats").add(formData)
        .then(docRef => {
            console.log(invitationList);
            setLoader(false)
            
            db.collection('Recent').add(
                otherFormData,
            ).then(function (doc) {
                doc.update({chatRoomID: docRef.id})
                doc.update({recentId: doc.id})
                alert("added to recent")
            }).catch(() => {
                alert("error here")
            })

            docRef.update({chatRoomId: docRef.id})
            history.push(`/messages/${docRef.id}`)
        }).catch(function (error) {
            setLoader(false)
            console.error("Error adding document: ", error);
        });

        //Create a chatroom once user clicks on message
        // await db.collection('ChatRooms').add(formData).then(function (docRef) {

        //     setChatRoom(Object.assign(formData,{chatRoomId: docRef.id}))

        //     // Update Id field in the chatroom document using the document reference id
        //     docRef.update({chatRoomId: docRef.id})
        //      db.collection('Recent').add(recentData)
        //         .then(async function (doc) {
        //         await doc.update({recentId: doc.id,chatRoomID: docRef.id})
        //             doc.get().then( (recentSnapshot) =>{
        //                 console.log(recentSnapshot.data())
        //                 try {
        //                     {
        //                         // Check if there is a file with a certain file size
        //                         file && file.size
        //                             ?

        //                             // Push File to the firebase storage
        //                             storage.ref(`chatRoom/${docRef.id}/groupPhoto`).put(file)
        //                                 .then(snapshot => {

        //                                     //Fetch the file url
        //                                     snapshot.ref.getDownloadURL().then((url) => {

        //                                         // Update Chatroom groupImageUrl field
        //                                         var updatedInfo = { groupImageUrl: url}
        //                                         updateFirestoreDocument('ChatRooms', docRef.id, updatedInfo)
        //                                         updateFirestoreDocument('Recent', doc.id, {userProfileImageUrl:url})
        //                                         var latestRecentObj = Object.assign(recentSnapshot.data(),{userProfileImageUrl:url})

        //                                         console.log([...chatList, latestRecentObj])
        //                                         setChatList([...chatList, latestRecentObj])
        //                                         // setChatList(latestRecentObj)

        //                                     })
        //                                     setFile('')


        //                                 })
        //                                 .catch(error => {
        //                                     setLoader(false)
        //                                 })


        //                             :
        //                             alert('Error updating')



        //                     }

        //                 } catch (e) {
        //                     setLoader(false)
        //                     console.log(e.message)
        //                     console.log('error')

        //                 }
        //                 }
        //             )


            // })


        //     // Hide Loader
        //     setLoader(false)

        //     // Redirect to the newly created chatRoom  endpoint
        //     history.push(`/messages/${docRef.id}`)

        // })
        //     .catch(function (error) {
        //         setLoader(false)
        //         console.error("Error adding document: ", error);
        //     });
    }

    useEffect(() =>{
        setParticipants([])
        getRealtimeChild('Events','EventCommissionerId',user.uid).get()
            .then((snapshot) =>{

                snapshot.forEach((doc) =>{
                    eventsList.push(doc.val())
                })
                setCreatedEvents(eventsList)
                console.log(createdEvents)

            })

    },[])

    return (
        <form id={`create-group-form`} action="" onSubmit={handleSubmit}>

        <div className={`row`}>
                <div className={`col border-right border-secondary`}>
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

                    <input style={{backgroundImage: `url(${group})`}} placeholder={`Group name`} name={`groupName`} type="text"/>
                </div>
                <div className={`col border-right border-secondary`}>
                    <div className='search-dropdown'>
                        { createdEvents ? createdEvents?.map(event  =>{
                            return(
                                <>
                            <SearchItem  event={event}/>
                                </>
                            )
                        }) : 'p'}

                    </div>
                </div>
                <div className={`col event-details ` }>
                    <div className='user-list w-100 d-flex flex-column '>
                        { participants ? participants?.map(user  =>{
                            return(<>
                                <div className={`d-flex align-items-center`}>
                                    <UserList  user={user} key={user.userId} />
                                    <div className={`form-group ml-auto text-right`}>


                                    <input type="checkbox" userId={user.userId} email={user.email} id={user.userName} name={user.userName} />
                                        <label htmlFor={user.userName}></label>

                                    </div>
                                    </div>
                                    </>
                            )
                        }) : 'No participants yet'}

                    </div>

                </div>




        </div>
            <button className={`btn btn-clear`}> Create</button>
        </form>

    );
}

export default CreateGroup;