import React, {useState} from "react";
import trophy from "../../images/trophy.svg";
import Login from "./login";
import './login.css'
import Signup from "../signup/form";
import facebook from "../../images/facebook.svg";
import google from "../../images/google.svg";
import {Modal} from "react-bootstrap";
import ForgotPassword from "../../utility/resetPassword";

function LoginMobile(props) {
    const [showForm, setShowForm] = useState({login: true, signup: false, forgotPassword: false})

    const [showLoginMobile,setLoginMobile] = useState(true)
    const [showAccountText,setShowAccountText] = useState(true)
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal"
            className="custom-modal" //Add class name here

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='text-left'>
                        <img className="form-image" src={trophy} alt=""/>
                        <p className="form-title pt-4">Fantasy Sport Event</p>
                        <p className='form-text f-18'>Please register your details to continue
                            with Fantasy Sport Event</p>
                    </div>
</Modal.Title>
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
                            : ''}
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
function LoginLink() {
    const [modalShow, setModalShow] = React.useState(false);


    return (
        <>
            <a onClick={() => setModalShow(true)} className="nav-link" href="#">Login</a>


            <LoginMobile
                show={modalShow}
                onHide={() => setModalShow(false) }
            />
        </>
    );
}
export default LoginLink
