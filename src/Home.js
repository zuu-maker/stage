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

import Login from "./sections/login/login";
import {AuthProvider} from "./contexts/authContext";
import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom'


function Home() {
  return (
      <Router>
        <AuthProvider>

          <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/events" component={Events} />
              <div className="home">

                  <Hero/>
                  <Features/>
                  <Performance/>
                  <DownloadLinks/>
                  <Testimonials/>
                  <ContactUs/>
                  <Footer/>
              </div>
          </Switch>
        </AuthProvider>

      </Router>

  );
}

export default Home;
