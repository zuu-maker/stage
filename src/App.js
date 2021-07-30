
import Signup from './sections/signup/form'
import Events from "./sections/events/events";
import EventDetails from "./sections/events/eventDetails";

import {FormProvider} from "./contexts/formContext";

import {BrowserRouter as Router ,Switch, Route,useLocation} from 'react-router-dom'
import {EventProvider} from "./contexts/eventsContext";
import {LoaderProvider} from "./contexts/loaderContext";
import UserProfile from "./sections/profile/userProfile";
import Message from "./sections/message/message.js";
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
import { useEffect } from 'react';
import { auth, db } from './firebase/firebase';
import { useStateValue } from './contexts/StateProvider';
import {useAuthState} from "react-firebase-hooks/auth"
import {getRealtimeChild} from "./helper/helper";

function App() {
   
    const [currentUser] = useAuthState(auth)

    const  [{user}, dispatch] = useStateValue()


    useEffect(() => {
        const cleanup = auth.onAuthStateChanged((user) => {
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
        return () => cleanup();
    },[])

    const location = useLocation();
    return (

              <LoaderProvider>

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
