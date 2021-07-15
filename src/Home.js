import './css/Home.css';
import Hero from './sections/hero/hero';
import Features from './sections/features/features';
import Performance from './sections/performance/performance';
import DownloadLinks from './sections/downloadLinks/downloadLinks';
import Testimonials from './sections/testimonials/testimonials';
import ContactUs from './sections/contactUs/contactUs';
import Footer from './sections/footer/footer';
import Signup from './sections/signup/form'
import Events from "./sections/events/events";
import EventDetails from "./sections/events/eventDetails";

import Login from "./sections/login/login";
import {AuthProvider, useAuth} from "./contexts/authContext";
import {FormProvider} from "./contexts/formContext";

import {BrowserRouter as Router ,Switch, Route,useLocation} from 'react-router-dom'
import {EventProvider} from "./contexts/eventsContext";
import {LoaderProvider} from "./contexts/loaderContext";
import UserProfile from "./sections/profile/userProfile";
import OtherUser from "./sections/profile/otherUser";
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


function Home() {
    // const location = useLocation();

    return (

        <Router>
          <AuthProvider>
              <LoaderProvider>

              <UserProvider>

              <ChatProvider>



                  <FormProvider>



          <Switch>
              {/*<SlideRoutes location={location}>*/}

              <Route path="/signup" component={Signup} />
              <EventProvider>
                  <TransactionProvider>
                  <Route path="/events" component={Events} />
                  <Route path="/eventDetails/:id" component={EventDetails} />

              <Route exact path="/user/:id" component={UserProfile} />
              <Route exact path="/user/:id/joined-events" component={JoinedEvents} />
              <Route exact path="/user/:id/created-events" component={CreatedEvents} />
              <Route exact path="/user/:id/create-schedule" component={CreateSchedule} />
              <Route exact path="/user/:id/deposit" component={Deposit} />
              <Route exact path="/user/:id/withdraw" component={Withdraw} />
              <Route exact path="/messages" component={Message} />
              <Route path="/messages/:id" component={Message} />
              {/*</SlideRoutes>*/}
                      </TransactionProvider>

              </EventProvider>

              <div className="home">

<>
                  <Hero/>
                  <Features/>
                  <Performance/>
                  <DownloadLinks/>
                  <Testimonials/>
                  <ContactUs/>
                  <Footer/>
</>

              </div>
          </Switch>
          </FormProvider>
                  </ChatProvider>

                  </UserProvider>
              </LoaderProvider>

          </AuthProvider>

      </Router>
  );
}

export default Home;
