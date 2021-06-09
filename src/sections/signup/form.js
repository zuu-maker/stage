import React, {useRef, useState} from 'react';
import './signup.css';
import trophy from '../../images/trophy.svg';
import password from '../../images/password.svg';
import mail from '../../images/mail.svg';
import user from '../../images/user.svg';
import facebook from '../../images/facebook.svg';
import google from '../../images/google.svg';
import {db, realDB} from '../../firebase/firebase'
import {useAuth} from "../../contexts/authContext";


function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {signup, currentUser} = useAuth()
    const [username, setUsername] = useState("")
    const [usernameError, setUserNameError] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const  checkUserName = () =>{
        db.collection('users').get().then(snapshot => {

            let userList = []
            snapshot.forEach(doc =>{
                    const data =doc.data()
                    userList.push(data)
                if(username === data.username ){
                    console.log('Username is already taken')
                    setError('Username is already taken')
                    setUserNameError(true)
                    console.log(usernameError)

                }else {
                    setUserNameError(false)
                }
                }
            )


        })

        // return  realDB.ref('users').child("username").equalTo(username).orderByValue()


    }
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(usernameError)
        console.log(checkUserName())
        checkUserName()
        if(!usernameError){
            try {
                setError('')
                // const userRef = realDB.ref('users');


                // userRef.on('value',(snapshot) =>{
                //     let userList = [];

                // })

                setLoading(true)
                await signup(emailRef.current.value, passwordRef.current.value).then(
                    () => {
                        var userInfo = {
                            username: username,
                            email: currentUser.email,
                            userId: currentUser.uid,
                            emailVerified: currentUser.emailVerified,
                            providerId: currentUser.providerId,
                            // password : currentUser.passwordHash,
                        }; //user info
                        db.collection('users').add(userInfo)
                        realDB.ref('/users').push(userInfo)
                    }
                )

                    .then(() => console.log('Added to db'))
                    .catch(err => {
                        setError('Failed to Sign Up')
                    })

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
            setLoading(false)}



    }

    return (
        <>
            <p className="text-danger">{error}</p>

            <form className="form" onSubmit={handleSubmit}>
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
