import React, {useState} from 'react';
import arrow from '../../images/arrow.svg'
import dummy from '../../images/dummy.png'
import './header.css'
import {db} from "../../firebase/firebase";
import {useAuth} from "../../contexts/authContext";
import {Dropdown} from "react-bootstrap";
import {useHistory} from 'react-router-dom'



function CurrentUserDropdown({user}) {
    const { logout,currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleLogOut(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await logout()
            history.push('/events')
        } catch (err) {
            setError(err.message)
            setLoading(false)

        }
    }

    return (
        <>
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                <div className=" d-inline-flex pointer center user-thumb-container">
                    <div className='user-img-wrapper'>
                        <img src={dummy} alt=""/>
                    </div>
                    <div>
                        <img src={arrow} alt=""/>
                    </div>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut} href="#/action-1">Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </>
    );
}

export default CurrentUserDropdown;