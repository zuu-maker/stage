
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

                db.collection('Users').where('objectId', "==", user.uid)
                 .onSnapshot((snapshot) => {
                    //  console.log(snapshot.docs.map(doc => doc.data()))
                     const userArr  = snapshot.docs.map(doc => doc.data())
                     const userData = userArr?.find( b=>{ return b})
                     dispatch({
                        type:"SET_USER_DATA",
                        userData
                    })

                 })
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
                      <SlideRoutes  location={location}>

                      <Route path="/events" component={Events} />
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
              <Route path="/" component={Home} />  

                      </SlideRoutes>
                      </TransactionProvider>




          </EventProvider>

          </Switch>
          </FormProvider>
                  </ChatProvider>
              </LoaderProvider>


  );
}

export default App;
