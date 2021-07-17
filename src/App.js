
import Signup from './sections/signup/form'
import Events from "./sections/events/events";
import EventDetails from "./sections/events/eventDetails";

import {AuthProvider, useAuth} from "./contexts/authContext";
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


function App() {
    const location = useLocation();
    return (

          <AuthProvider>
              <LoaderProvider>

              <UserProvider>

              <ChatProvider>



                  <FormProvider>



          <Switch>


              <EventProvider>
                  <TransactionProvider>
                      <SlideRoutes  location={location}>

                      <Route path="/events" component={Events} />
                  <Route path="/eventDetails/:id" component={EventDetails} />
                          <Route path="/signup" component={Signup} />

              <Route exact path="/user/:id" component={UserProfile} />
              <Route exact path="/user/:id/joined-events" component={JoinedEvents} />
              <Route exact path="/user/:id/created-events" component={CreatedEvents} />
              <Route exact path="/user/:id/create-schedule" component={CreateSchedule} />
              <Route exact path="/user/:id/deposit" component={Deposit} />
              <Route exact path="/user/:id/withdraw" component={Withdraw} />
              <Route exact path="/messages" component={Message} />
              <Route path="/messages/:id" component={Message} />
              <Route path="/" component={Home} />

                      </SlideRoutes>
                      </TransactionProvider>




          </EventProvider>

          </Switch>
          </FormProvider>
                  </ChatProvider>

                  </UserProvider>
              </LoaderProvider>

          </AuthProvider>

  );
}

export default App;
