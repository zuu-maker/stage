import './css/Home.css';
import Hero from './sections/hero/hero';
import Features from './sections/features/features';
import Performance from './sections/performance/performance';
import DownloadLinks from './sections/downloadLinks/downloadLinks';
import Testimonials from './sections/testimonials/testimonials';
import ContactUs from './sections/contactUs/contactUs';
import Footer from './sections/footer/footer';
import Signup from './sections/signup/form'


function Home() {
  return (
    <div className="home">
      <Hero/>
      <Signup />
      <Features/>
      <Performance/>
      <DownloadLinks/>
      <Testimonials/>
      <ContactUs/>
      <Footer/>
    </div>
  );
}

export default Home;
