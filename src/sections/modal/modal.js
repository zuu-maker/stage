import React, {useRef, useEffect, useCallback, useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import Signup from "../signup/form";
import trophy from "../../images/trophy.svg";
import facebook from "../../images/facebook.svg";
import google from "../../images/google.svg";
import './modal.css'
import Login from "../login/login";


function LoginModal(props) {
    const [showForm,setShowForm] = useState(true)
    const [showAccountText,setShowAccountText] = useState(true)
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal"
            className="custom-modal" //Add class name here

        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    <img className="form-image" src={trophy} alt=""/>
                    <p className="form-title">Fantasy Sport Event</p>
                    <p className='form-text'>Please register your details to continue
                        with Fantasy Sport Event</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showForm ?<Login/>: <Signup/>}

            </Modal.Body>
            <Modal.Footer>

                <h6 className='w-100'>CONNECT WITH</h6>
                <div className='social-icons-container '>
                    <div className='social-icon '>
                        <img className="text-center" src={facebook} alt=""/>
                    </div>
                    <div className='social-icon '>
                        <img className="text-center" src={google} alt=""/>
                    </div>

                </div>
                <div className='w-100 form-text'>
                    <h6 >Don't have an account?<span onClick={() => setShowForm(!showForm)} className="login-text">Log In</span></h6>

                </div>
            </Modal.Footer>
        </Modal>
    );
}
function SignUpModal(props) {
    const [showForm,setShowForm] = useState(true)
    const [showAccountText,setShowAccountText] = useState(true)
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal"
            className="custom-modal" //Add class name here

        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    <img className="form-image" src={trophy} alt=""/>
                    <p className="form-title">Fantasy Sport Event</p>
                    <p className='form-text'>Please register your details to continue
                        with Fantasy Sport Event</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showForm ? <Signup/> : <Login/>}

            </Modal.Body>
            <Modal.Footer>

                <h6 className='w-100'>CONNECT WITH</h6>
                <div className='social-icons-container '>
                    <div className='social-icon '>
                        <img className="text-center" src={facebook} alt=""/>
                    </div>
                    <div className='social-icon '>
                        <img className="text-center" src={google} alt=""/>
                    </div>

                </div>
                <div className='w-100 form-text'>
                    <h6 >Already have an account?<span onClick={() => setShowForm(!showForm)} className="login-text">Log In</span></h6>

                </div>
            </Modal.Footer>
        </Modal>
    );
}

function SignupBtn() {
    const [signupModal, setSignUpModal] = React.useState(false);

    return (
        <>
            <button onClick={() => setSignUpModal(true)} className="btn ml-2 btn-clear">Sign Up</button>


            <SignUpModal
                show={signupModal}
                onHide={() => setSignUpModal(false)}
            />
        </>
    );
}
function LoginBtn() {
    const [loginModal, setLoginModal] = React.useState(false);

    return (
        <>
            <button onClick={() => setLoginModal(true)} className="btn ml-2 btn-clear">Login</button>


            <LoginModal
                show={loginModal}
                onHide={() => setLoginModal(false)}
            />
        </>
    );
}

export {LoginBtn,SignupBtn}