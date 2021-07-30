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
import edit from "../../images/edit.png";
import EditProfile from '../../sections/forms/editProfileForm'
import Icon from "../../components/icon";
import CreateGroup from "../../components/createGroup";
import update from "../../images/edit.svg";





function LoginModal(props) {
    const [showForm, setShowForm] = useState({login: true, signup: false, forgotPassword: false, eventForm : false})
    const {formType,setFormType}= useForm()
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes";
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
                                :formType == 'editProfile' ? <EditProfile/>
                                    :formType == 'createGroup' ? <CreateGroup/>
                                      //: formType == 'deposit' ? <>
                                    //     <h4 className={`text-light`}> Your account has insufficient funds.<br/>Please deposit funds to your account</h4>
                                    //         <Link to={`/user/${currentUser.us}`}></Link><button className={`btn`}>Deposit</button>
                                    //     </>

                                        : <div>Please refresh</div>}


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

function CreateGroupBtn() {
    const {formType,setFormType}= useForm()
    const [modalShow, setModalShow] = React.useState(false);



    const  handleCreateGroup = () =>{
      setFormType('createGroup')

      setModalShow(true)
    }


    return (
        <>
            <button onClick={handleCreateGroup } style={{backgroundImage: `url(${plus})`}} className="btn lg-view add-btn"></button>
            <button onClick={handleCreateGroup } style={{backgroundImage: `url(${plus})`}} className="  btn-mobile"></button>


            <LoginModal
                size="lg"
                show={modalShow}
                onHide={() => setModalShow(false) }
            />
        </>
    );
}


function EditProfileBtn() {
    const {formType,setFormType}= useForm()
    const [modalShow, setModalShow] = React.useState(false);



    const  editProfile = () =>{
        setFormType('editProfile')

        setModalShow(true)
    }


    return (
        <>
            {/*<Icon  props={{backgroundColor:'#13161A' , image:update}}/>*/}
            {/*<Icon  props={{backgroundColor: '#2B3038',image: edit , click: {editProfile}} }/>*/}
            {/*<button onClick={editProfile } style={{backgroundImage: `url(${edit})`}} className=""></button>*/}
            <div onClick={editProfile } style={{backgroundColor: '#13161A'}} className='icon-wrapper pointer'>
                <div className='center'>
                    <img src={update} alt=""/>

                </div>
            </div>

            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false) }
            />
        </>
    );
}




export  {LoginBtn, CreateEventBtn, EditProfileBtn,CreateGroupBtn}
