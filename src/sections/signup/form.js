import React, {useRef, useState} from 'react';
import './signup.css';
import trophy from '../../images/trophy.svg';
import password from '../../images/password.svg';
import mail from '../../images/mail.svg';
import user from '../../images/user.svg';
import {useAuth} from "../../contexts/authContext";
import {pushData} from "../../helper/helper";


function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {signup, currentUser} = useAuth()
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)



     async function handleSubmit(e) {
        e.preventDefault()
            try {
                setError('')
                setLoading(true)
                console.log('before')
                 await signup(emailRef.current.value, passwordRef.current.value).then(
                    () => {
                        var userInfo = {
                            username: username,
                            email: currentUser.email,
                            userId: currentUser.uid,
                            emailVerified: currentUser.emailVerified,
                            providerId: currentUser.providerId,
                        };
                        console.log('reached')

                        pushData('Users',userInfo)
                        console.log('Added to db')
                    }
                )


            } catch (err) {
                switch (err.code) {

                    case 'auth/email-already-in-use':
                        setError('Email already exists')
                    case 'auth/invalid-email':
                        setError(err.message)
                        break;
                    case 'auth/weak-password':
                        setError(err.message)
                        break;


                }
            }
            setLoading(false)
        console.log(error)



    }

    return (
        <>
            <p className="text-danger">{error}</p>

            <form className="form" onSubmit={handleSubmit}>
                <img className="form-image" src={trophy} alt=""/>
                <p className="form-title pt-4">Fantasy Sport Event</p>
                <p className='form-text f-18'>Please register your details to continue
                    with Fantasy Sport Event</p>
                <div className="input-group">
                    <input ref={usernameRef} onChange={(e) => setUsername(e.target.value)} name="username"
                           style={{backgroundImage: `url(${user})`}} type="text"
                           placeholder="Username"/>
                    <input ref={emailRef} name="email" style={{backgroundImage: `url(${mail})`}} type="Email"
                           placeholder="Email"/>
                    <input ref={passwordRef} name="password" style={{backgroundImage: `url(${password})`}}
                           type="Password" placeholder="Password"/>

                </div>

                <button disabled={loading} style={{background: loading ? '#ffffff' : ''}} type="submit"><span
                    className='form-btn'>Sign Up</span></button>
            </form>
        </>
    );
}

export default Signup;
