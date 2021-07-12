// import React, {useEffect, useState} from 'react';
// import Message from "./message.js";
// import {getOptions} from "../../helper/helper";
// import {useLoader} from "../../contexts/loaderContext";
//
// function UserMessages(props) {
//     const [chatList,setChatList] = useState([]);
//     const {setLoader} = useLoader();
//
//
//     useEffect( async () =>{
//         // {messageId ? setOpenedChat(true): setOpenedChat(false)}
//
//         setLoader(true)
//         let x = [{chatRoomId: 1},{chatRoomId: 2},{chatRoomId: 3},{chatRoomId: 4},{chatRoomId: 5}]
//         setChatList(await getOptions('ChatRooms'))
//         // setChatList(x)
//         setLoader(false)
//         console.log(chatList)
//     },[])
//     return (
//         <div>
//             <Message m={chatList} />
//         </div>
//     );
// }
//
// export default UserMessages;