import React, {useRef , useState} from 'react';
import './events.css';
import {useAuth} from "../../contexts/authContext";


export default function EventForm() {
    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
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
                    break;        }
        setLoading(false)

    }
    }

    return (
        <>
            <p className="text-danger">{error}</p>
        <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">

                <input  name="password" style={{backgroundImage: `url(${password})`}}
                       type="text" placeholder="Event Name"/>
                       <input  name="password" style={{backgroundImage: `url(${password})`}}
                              type="text" placeholder="Sport Name"/>
                              <input  name="password" style={{backgroundImage: `url(${password})`}}
                                     type="text" placeholder="Select Difficulty"/>
                                     <input  name="password" style={{backgroundImage: `url(${password})`}}
                                            type="text" placeholder="Select Style"/>
                                            <input  name="password" style={{backgroundImage: `url(${password})`}}
                                                   type="text" placeholder="Registration Start Date"/>
                                                   <input  name="password" style={{backgroundImage: `url(${password})`}}
                                                          type="text" placeholder="Registration End Date"/>
                                                          <input  name="password" style={{backgroundImage: `url(${password})`}}
                                                                 type="text" placeholder="Maximum Number of Participant"/>
                                                                 <input  name="password" style={{backgroundImage: `url(${password})`}}
                                                                        type="text" placeholder="Entry Fee"/>

            </div>

            <button disabled={loading} style={{background : loading ? '#ffffff':''}}  type="submit"><span className='form-btn'>Create Event</span></button>
        </form>
</>
    );
}
