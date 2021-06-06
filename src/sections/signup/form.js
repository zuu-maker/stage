import React from 'react';
import './signup.css';
import trophy from '../../images/trophy.svg';
import password from '../../images/password.svg';
import mail from '../../images/mail.svg';
import user from '../../images/user.svg';
import facebook from '../../images/facebook.svg';
import google from '../../images/google.svg';


function Signup(props) {
    return (
        <div className="form-container">
            <img className="form-image" src={trophy} alt=""/>
            <h3 className="form-title">Fantasy Sport Event</h3>
            <p>Please register your details to continue
                with Fantasy Sport Event</p>

            <form className="form">
                <div className="input-group">
                    <input style={{backgroundImage: `url(${user})`}} type="text" placeholder="Username"/>
                    <input style={{backgroundImage: `url(${mail})`}} type="Email" placeholder="Email"/>
                    <input style={{backgroundImage: `url(${password})`}} type="Password" placeholder="Password"/>

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
