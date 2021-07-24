import React, {useState} from 'react';
import arrow from '../../images/arrow.svg'
import dummy from '../../images/dummy.png'
import './header.css'
import {auth, db} from "../../firebase/firebase";
import {useAuth} from "../../contexts/authContext";
import {Dropdown} from "react-bootstrap";
import {Link, useHistory} from 'react-router-dom'
import defaultProfilePhoto from '../../images/default_profile_photo.svg';
import { useStateValue } from '../../contexts/StateProvider';



function CurrentUserDropdown() {
    const [{user}, dispatch] = useStateValue();
    //  const { logout,currentUser } = useAuth()
    // console.log(user);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleLogOut(e) {
        e.preventDefault()
        try {
            alert("hey")
            // setError('')
            // setLoading(true)
            auth.signOut()
            // history.push('/')
            dispatch({
                type:"SET_USER",
                user:{}
            })
           
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

                                <img src={user?.photoURL} alt=""/>



                    </div>
                    <div>
                        <img src={arrow} alt=""/>
                    </div>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item  ><Link to={`/user/${user?.uid}`}>Profile</Link></Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut} >Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </>
    );
}

export default CurrentUserDropdown;