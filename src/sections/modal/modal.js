import React, {useRef, useEffect, useCallback, useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import Signup from "../signup/form";
import trophy from "../../images/trophy.svg";
import facebook from "../../images/facebook.svg";
import google from "../../images/google.svg";
import './modal.css'
import Login from "../login/login";
import EventsForm from '../events/eventsForm'
import ForgotPassword from "../../utility/resetPassword";
import {useForm} from "../../contexts/formContext";
import plus from "../../images/plus.svg";





function LoginModal(props) {
    const [showForm, setShowForm] = useState({login: true, signup: false, forgotPassword: false, eventForm : false})
    const {formType,setFormType}= useForm()

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
    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formType == 'loginForm' ?
                    <>
                        <Login/>
                        <p className='pt-3 form-text f-18'> Don't have an account? <span
                            onClick={() => {setShowForm({login: false, signup: true, forgotPassword: false});setFormType('signupForm')}}
                            className="login-text pointer">Sign Up</span></p>
                        <p className='text-light pointer' onClick={() => {setShowForm({login: false, signup: false, forgotPassword: true});setFormType('forgotForm')}}>Forgot Password</p>
                    </>
                    : formType == 'signupForm' ?
                        <>

                            <Signup/>
                            <p className='pt-3 form-text f-18'>Have an account? <span onClick={() => {setShowForm({
                                signup: false,
                                login: true,
                                forgotPassword: false
                            });setFormType('loginForm')}} className="login-text pointer">Log In</span></p>
                        </>
                        : formType == 'forgotForm' ?
                            <>
                                <ForgotPassword/>
                                <p className='pt-3 form-text f-18'>Have an account? <span onClick={() => { setShowForm({
                                    signup: false,
                                    login: true,
                                    forgotPassword: false
                                });setFormType('loginForm')}} className="login-text pointer">Log In</span></p>
                            </>

                            :formType == 'eventForm' ? <EventsForm/>
                            : <div>failed</div>}


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
  const {formType,setFormType}= useForm()
  const [modalShow, setModalShow] = React.useState(false);



  const  HandleLogin = () =>{
    setFormType('loginForm')

    setModalShow(true)
  }

    return (
        <>
            <button onClick={HandleLogin} className="btn ml-2 btn-clear">Login</button>


            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false) }
            />
        </>
    );
}

function CreateEventBtn() {
    const {formType,setFormType}= useForm()
    const [modalShow, setModalShow] = React.useState(false);



    const  HandleCreateEvent = () =>{
      setFormType('eventForm')

      setModalShow(true)
    }


    return (
        <>
            <button onClick={HandleCreateEvent } className="btn  btn-lg-screen">Create Event</button>
            <button onClick={HandleCreateEvent } style={{backgroundImage: `url(${plus})`}} className="  btn-mobile"></button>


            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false) }
            />
        </>
    );
}




export  {LoginBtn, CreateEventBtn}
