import React from 'react';
import arrow from '../../images/arrow.svg'
import dummy from '../../images/dummy.png'
import './header.css'
import {db} from "../../firebase/firebase";
import {useAuth} from "../../contexts/authContext";



function CurrentUserDropdown(props) {

    return (
            <div className="ml-2 d-inline-flex pointer center user-thumb-container">
                <div className='user-img-wrapper'>
                    <img src={dummy} alt=""/>
                </div>
                <div>
                    <img src={arrow} alt=""/>
                </div>
            </div>
    );
}

export default CurrentUserDropdown;