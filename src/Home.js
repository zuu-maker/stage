import './css/Home.css';
import Hero from './sections/hero/hero';
import Features from './sections/features/features';
import Performance from './sections/performance/performance';
import DownloadLinks from './sections/downloadLinks/downloadLinks';
import Testimonials from './sections/testimonials/testimonials';
import ContactUs from './sections/contactUs/contactUs';
import Footer from './sections/footer/footer';
import {useAuth} from "./contexts/authContext";
import {useLocation} from "react-router-dom";
import { useStateValue } from './contexts/StateProvider';
import './css/style.css'


function Home() {
    const [{user}] = useStateValue()
    const location = useLocation();


    return (
        <>

        <div className="home">
            <Hero/>
            <Features/>
            <Performance/>
            <DownloadLinks/>
            <Testimonials/>
            <ContactUs/>
            <Footer/>
        </div>

        </>

  );
}

export default Home;
