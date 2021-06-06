import React,{useRef} from 'react';
import './signup.css';
import trophy from '../../images/trophy.svg';
import password from '../../images/password.svg';
import mail from '../../images/mail.svg';
import user from '../../images/user.svg';
import facebook from '../../images/facebook.svg';
import google from '../../images/google.svg';
import firebaseDB from "firebase";


function Signup(props) {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    return (
        <div className="form-container">
            <img className="form-image" src={trophy} alt=""/>
            <p className="form-title">Fantasy Sport Event</p>
            <p>Please register your details to continue
                with Fantasy Sport Event</p>

            <form className="form">
                <div className="input-group">
                    <input ref={usernameRef} name="username" style={{backgroundImage: `url(${user})`}} type="text" placeholder="Username"/>
                    <input ref={emailRef} name="email" style={{backgroundImage: `url(${mail})`}} type="Email" placeholder="Email"/>
                    <input ref={passwordRef} name="password" style={{backgroundImage: `url(${password})`}} type="Password" placeholder="Password"/>

                </div>

                <button type="submit">Sign up</button>
            </form>
            <h6>CONNECT WITH</h6>
            <div className='social-icons-container '>
                <div className='social-icon '>
                    <img className="text-center" src={facebook} alt=""/>
                </div>
                <div className='social-icon '>
                    <img className="text-center" src={google} alt=""/>
                </div>

            </div>
            <h6>Already have an account?<span className="login-text">Log In</span></h6>
        </div>

    );
}

export default Signup;
