import React, {useRef , useState} from 'react';
import './login.css';
import trophy from '../../images/trophy.svg';
import password from '../../images/password.svg';
import mail from '../../images/mail.svg';
import user from '../../images/user.svg';
import facebook from '../../images/facebook.svg';
import google from '../../images/google.svg';

import {useAuth} from "../../contexts/authContext";
import Signup from "../signup/form";
import {useHistory} from 'react-router-dom'
import {Modal} from "react-bootstrap";
import { auth } from '../../firebase/firebase';
import { useStateValue } from '../../contexts/StateProvider';



//update login here
export default function Login() {
    const history = useHistory()
    const [{user}, dispatch] = useStateValue()
    
    const emailRef = useRef()
    const passwordRef = useRef()
    // const { login,currentUser  } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            //logging user in
            await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
                .then((user) => {
                    dispatch({
                        type: "SET_USER",
                        user
                    })
                    history.push(`/user/${user.user.uid}`)
                })

        } catch (err) {
            switch (err.code) {
                case 'auth/invalid-email':
                    setError(err.message)
                case 'auth/user-disabled':
                    setError('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.')
                case 'auth/user-not-found':
                    setError("Account doesn't exist")
                    break;
                case 'auth/wrong-password':
                    setError("Password entered is wrong")
                    break;
            }
            setLoading(false)

        }
    }

    return (
        <>
        <form className="form" onSubmit={handleSubmit}>
            <div className={`header-content lg-view`}>
                <img className="form-image" src={trophy} alt=""/>
                <p className="form-title pt-4">Fantasy Sport Event</p>
                <p className='form-text f-18'>Please register your details to continue
                    with Fantasy Sport Event</p>
            </div>
            <p className="text-danger">{error}</p>

            <div className="input-group">
        <input ref={emailRef} name="email" style={{backgroundImage: `url(${mail})`}} type="Email"
                       placeholder="Email"/>
                <input ref={passwordRef} name="password" style={{backgroundImage: `url(${password})`}}
                       type="Password" placeholder="Password"/>

            </div>

            <button disabled={loading} style={{background : loading ? '#ffffff':''}}  type="submit"><span className='form-btn'>Login</span></button>
        </form>
</>
    );
}
