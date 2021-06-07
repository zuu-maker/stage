import React, {useRef , useState} from 'react';
import './login.css';
import trophy from '../../images/trophy.svg';
import password from '../../images/password.svg';
import mail from '../../images/mail.svg';
import user from '../../images/user.svg';
import facebook from '../../images/facebook.svg';
import google from '../../images/google.svg';
import { Link, useHistory } from "react-router-dom"
import {useAuth} from "../../contexts/authContext";


function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login } = useAuth()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
        } catch (e) {
        setError('Failed to create an account')
        }
        setLoading(false)

    }

    return (
        <div className="form-container">
            <img className="form-image" src={trophy} alt=""/>
            <p className="form-title">Fantasy Sport Event</p>
            <p>Please register your details to continue
                with Fantasy Sport Event</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input ref={emailRef} name="email" style={{backgroundImage: `url(${mail})`}} type="Email"
                           placeholder="Email"/>
                    <input ref={passwordRef} name="password" style={{backgroundImage: `url(${password})`}}
                           type="Password" placeholder="Password"/>

                </div>

                <button disabled={loading} type="submit">Log In</button>
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
            <h6>Don't have an account?<span className="login-text">Sign Up</span></h6>
        </div>

    );
}

export default Login;
