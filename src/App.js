
import Signup from './sections/signup/form'
import Events from "./sections/events/events";
import EventDetails from "./sections/events/eventDetails";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {FormProvider} from "./contexts/formContext";

import {BrowserRouter as Router ,Switch, Route,useLocation} from 'react-router-dom'
import {EventProvider} from "./contexts/eventsContext";
import {LoaderProvider} from "./contexts/loaderContext";
import UserProfile from "./sections/profile/userProfile";
import Message from "./sections/message/message.js";
import { store } from 'react-notifications-component';
import {UserProvider} from "./contexts/userContext";
import {ChatProvider} from "./contexts/messageContext";
import JoinedEvents from "./sections/dashboard/joinedEvents";
import CreatedEvents from "./sections/dashboard/createdEvents";
import CreateSchedule from "./sections/dashboard/createSchedule";
import Withdraw from "./sections/dashboard/withdraw";
import Deposit from "./sections/dashboard/deposit";
import SlideRoutes from 'react-slide-routes';
import {TransactionProvider} from "./contexts/transactionContext";
import Home from "./Home";
import React, {useEffect, useState} from 'react';
import { auth, db } from './firebase/firebase';
import { useStateValue } from './contexts/StateProvider';
import {useAuthState} from "react-firebase-hooks/auth"
import {getRealtimeChild} from "./helper/helper";
import {css} from "@emotion/react";
import {Modal} from "react-bootstrap";
import PuffLoader from "react-spinners/PuffLoader";


// function NotificationPopup(props) {
//     const override = css`
//   display: block;
//       margin: 0 7%;`;
//     let [color, setColor] = useState("#18ff00");
//     return (
//         <Modal
//             {...props}
//             size="sm"
//             aria-labelledby="contained-modal-title-vcenter"
//
//             animation={`true`}
//             className={`event-popup`}
//         >
//
//             <Modal.Body>
//
//                 <div className={` d-flex flex-column p-3 text-left`}>
//                      <p className={`text-light`}> {props.payload?.fromUserName}</p>
//                      <p className={`text-light font-weight-light`}> {props.payload?.lastMessage}</p>
//
//
//                 </div>
//
//             </Modal.Body>
//
//         </Modal>
//     );
// }

function App() {

    const [currentUser] = useAuthState(auth)
    const [modalShow, setModalShow] = React.useState(false);
    const [newNotification, setNewNotification] = React.useState();
    const  [{user}, dispatch] = useStateValue()


    useEffect(() => {
        console.log('app mounted')
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user){
                // console.log(user);
                dispatch({
                    type:"SET_USER",
                    user
                })

                db.collection('Users').where('email', "==", user.email)
                 .onSnapshot((snapshot) => {
                    //  console.log(snapshot.docs.map(doc => doc.data()))
                     const userArr  = snapshot.docs.map(doc => doc.data())
                     const userData = userArr?.find( b=>{ return b})
                     console.log(userData)
                     dispatch({
                        type:"SET_USER_DATA",
                        userData
                    })

                 })
                // db.collection('Users').where('objectId', "==", 'bvi6ovzAN5XD8EynInm5NvfUo2A3')
                //     .get()
                //     .then((snapshot)=>{
                //         console.log(snapshot.docs.map(doc => doc.data()))
                //         console.log(snapshot)
                //         snapshot.docs.forEach((doc)=>{
                //             console.log(doc.data())
                //         })
                //     })
            }
        })
        return () => unsubscribe();
    },[])
    useEffect(() =>{
        if(user?.uid){
            console.log('notification mounted')

            const unsubscribe = db.collection("Recent").where("members", "array-contains", user.uid).orderBy('date','desc')
                .onSnapshot(snapshot => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            // console.log("New : ", change.doc.data());

                        }
                        if (change.type === "modified") {
                            console.log("new message : ", change.doc.data());
                            setNewNotification(change.doc.data())
                            // setModalShow(true)
                            {newNotification !==undefined && store.removeNotification(change.doc.data().recentId)}
                            {
                                change.doc.data().fromUserId !== user?.uid &&

                                store.addNotification({
                                    id: change.doc.data().recentId,
                                    title: change.doc.data().fromUserName,
                                    message: change.doc.data().lastMessage,
                                    type: "success",
                                    insert: "top",
                                    container: "top-right",
                                    animationIn: ["animate__animated", "animate__fadeIn"],
                                    animationOut: ["animate__animated", "animate__fadeOut"],
                                    dismiss: {
                                        duration: 500,

                                        pauseOnHover: true
                                    },
                                    touchSlidingExit: {
                                        swipe: {
                                            duration: 400,
                                            timingFunction: 'ease-out',
                                            delay: 0,
                                        },
                                        fade: {
                                            duration: 400,
                                            timingFunction: 'ease-out',
                                            delay: 0
                                        }
                                    }
                                });
                            }
                            // setNotificationPopup(change.doc.data())

                        }
                        if (change.type === "removed") {
                            console.log("Removed : ", change.doc.data());
                        }
                    })
                })
            return () => unsubscribe();
        }
    },[user?.uid])

    const location = useLocation();
    return (

              <LoaderProvider>
                  <ReactNotification isMobile={true} className={''}/>
                  {/*{user.uid  && <NotificationPopup*/}
                  {/*    payload={newNotification}*/}
                  {/*    show={modalShow}*/}
                  {/*    onHide={() => setModalShow(false)}*/}
                  {/*/>}*/}
              <ChatProvider>



                  <FormProvider>



          <Switch>

              <EventProvider>
                  <TransactionProvider>

                      <SlideRoutes animation={window.screen.width < 700 ? 'slide' : ''} location={location}>

                      <Route exact path="/events" component={Events} />
                      {user?.uid && <Route path="/eventDetails/:id" component={EventDetails} />}
                          <Route path="/signup" component={Signup} />

             {user?.uid &&<Route exact path="/user/:id/created-events" component={CreatedEvents} />}
             {user?.uid &&<Route exact path="/user/:id" component={UserProfile} />}
             {user?.uid &&<Route exact path="/user/:id/create-schedule" component={CreateSchedule} />}
             {user?.uid &&<Route exact path="/user/:id/joined-events" component={JoinedEvents} />}
             {user?.uid &&<Route exact path="/user/:id/deposit" component={Deposit} />}
             {user?.uid &&<Route exact path="/user/:id/withdraw" component={Withdraw} />}
             {user?.uid &&<Route exact path="/messages" component={Message} />}
             {user?.uid && <Route path="/messages/:id" component={Message} />}
                      </SlideRoutes>
                      {!user?.uid ? <Route exact path="/" component={ Home}/>:<Route exact path="/" component={ Events}/>}

                  </TransactionProvider>




          </EventProvider>

          </Switch>
          </FormProvider>
                  </ChatProvider>
              </LoaderProvider>


  );
}

export default App;
