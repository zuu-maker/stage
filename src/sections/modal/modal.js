import React, {useRef, useEffect, useCallback} from 'react';
import {Modal, Button} from "react-bootstrap";
import Signup from "../signup/form";
import trophy from "../../images/trophy.svg";
import facebook from "../../images/facebook.svg";
import google from "../../images/google.svg";
import './modal.css'


function MyVerticallyCenteredModal(props) {
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
                    <p>Please register your details to continue
                        with Fantasy Sport Event</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Signup/>
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
                <h6 className='w-100'>Already have an account?<span className="login-text">Log In</span></h6>
            </Modal.Footer>
        </Modal>
    );
}

function SignupBtn() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <button onClick={() => setModalShow(true)} className="btn ml-2 btn-clear">Sign Up</button>


            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
function LoginBtn() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <button onClick={() => setModalShow(true)} className="btn ml-2 btn-clear">Login</button>


            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export {LoginBtn,SignupBtn}