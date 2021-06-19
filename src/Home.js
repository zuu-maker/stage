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

import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom'
import {EventProvider} from "./contexts/eventsContext";
import {LoaderProvider} from "./contexts/loaderContext";
import UserProfile from "./sections/profile/userProfile";
import OtherUser from "./sections/profile/otherUser";


function Home() {
    const  currentUser  = useAuth()

    return (
      <Router>
          <LoaderProvider>
        <AuthProvider>
            <EventProvider>
          <FormProvider>



          <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/events" component={Events} />
              <Route path="/eventDetails" component={EventDetails} />
              <Route path="/user/other" component={OtherUser} />
              <Route path="/user/dashboard" component={UserProfile} />
              <div className="home">
                  { !currentUser ?<Events/>:
<>
                  <Hero/>
                  <Features/>
                  <Performance/>
                  <DownloadLinks/>
                  <Testimonials/>
                  <ContactUs/>
                  <Footer/>
</>
                  }
              </div>
          </Switch>
          </FormProvider>
            </EventProvider>
        </AuthProvider>
          </LoaderProvider>
      </Router>

  );
}

export default Home;
