import React, {useRef , useState} from 'react';
import './signup.css';
import trophy from '../../images/trophy.svg';
import password from '../../images/password.svg';
import mail from '../../images/mail.svg';
import user from '../../images/user.svg';
import facebook from '../../images/facebook.svg';
import google from '../../images/google.svg';

import {useAuth} from "../../contexts/authContext";


function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {signup } = useAuth()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch (e) {
        setError('Failed to create an account')
        }
        setLoading(false)

    }

    return (

            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input ref={usernameRef} name="username" style={{backgroundImage: `url(${user})`}} type="text"
                           placeholder="Username"/>
                    <input ref={emailRef} name="email" style={{backgroundImage: `url(${mail})`}} type="Email"
                           placeholder="Email"/>
                    <input ref={passwordRef} name="password" style={{backgroundImage: `url(${password})`}}
                           type="Password" placeholder="Password"/>

                </div>

                <button disabled={loading} type="submit">Sign up</button>
            </form>

    );
}

export default Signup;
