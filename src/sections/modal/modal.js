import React, {useRef, useEffect, useCallback, useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import Signup from "../signup/form";
import trophy from "../../images/trophy.svg";
import facebook from "../../images/facebook.svg";
import google from "../../images/google.svg";
import './modal.css'
import Login from "../login/login";
import ForgotPassword from "../../utility/resetPassword";
import EventForm from '../events/events'

import {useAuth} from "../../contexts/authContext";



function LoginModal(props) {
    const [showForm, setShowForm] = useState({login: true, signup: false, forgotPassword: false, eventForm : false})
    const [formType,setFormType] = useState('')
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal"
            className="custom-modal" //Add class name here

        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <img className="form-image" src={trophy} alt=""/>
                    <p className="form-title pt-4">Fantasy Sport Event</p>
                    <p className='form-text f-18'>Please register your details to continue
                        with Fantasy Sport Event</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showForm.login ?
                    <>
                        <Login/>
                        <p className='pt-3 form-text f-18'> Don't have an account? <span
                            onClick={() => setShowForm({login: false, signup: true, forgotPassword: false})}
                            className="login-text pointer">Sign Up</span></p>
                    </>
                    : showForm.signup ?
                        <>

                            <Signup/>
                            <p className='pt-3 form-text f-18'>Have an account? <span onClick={() => setShowForm({
                                signup: false,
                                login: true,
                                forgotPassword: false
                            })} className="login-text pointer">Log In</span></p>
                        </>
                        : showForm.forgotPassword ?
                            <>
                                <ForgotPassword/>
                                <p className='pt-3 form-text f-18'>Have an account? <span onClick={() => setShowForm({
                                    signup: false,
                                    login: true,
                                    forgotPassword: false
                                })} className="login-text pointer">Log In</span></p>
                            </>
                            : showForm.eventForm ? <EventForm />:''}
                {showForm.forgotPassword ? '' : <p className='text-light pointer' onClick={() => setShowForm({
                    forgotPassword: true,
                    signup: false,
                    login: false
                })}>Forgot Password?</p>}

            </Modal.Body>
            <Modal.Footer>
                {/*<p  onClick={() => setShowForgotPasswordForm(setShowForgotPasswordForm)} className="login-text text-light">Forgot Password?</p>*/}




                <h6 className='d-none w-100  social-header'>CONNECT WITH</h6>
                <div className='d-none social-icons-container '>
                    <div className='social-icon '>
                        <img className="text-center" src={facebook} alt=""/>
                    </div>
                    <div className='social-icon '>
                        <img className="text-center" src={google} alt=""/>
                    </div>

                </div>

            </Modal.Footer>
        </Modal>
    );
}


function LoginBtn() {
    const [modalShow, setModalShow] = React.useState(false);


    return (
        <>
            <button onClick={() => setModalShow(true)} className="btn ml-2 btn-clear">Login</button>


            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false) }
            />
        </>
    );
}



export default LoginBtn
