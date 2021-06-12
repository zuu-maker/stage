import logo from '../../images/logo.png';
import './header.css';
import  LoginBtn from "../modal/modal";
import LoginLink from "../login/loginMobile";
import {useState} from "react";
import Login from "../login/login";
import {useAuth} from "../../contexts/authContext";
import CurrentUserDropdown from "./currentUserDropdown";
import {NavLink} from 'react-router-dom'


export default function Header() {
    const [showForm,setShowForm] = useState(false)
    const { currentUser } = useAuth()

    return (
        <header className="header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col col-sm-12 col-lg-9 ">
                        <nav className="navbar navbar-expand-lg">
                            <NavLink className="navbar-brand col col-sm-3" href="#">
                                <img alt="" src={logo} width="75"/>
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
                                    <path
                                        d="M492,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,236,492,236z"/>
                                    <path
                                        d="M492,76H20C8.954,76,0,84.954,0,96s8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,76,492,76z"/>
                                    <path
                                        d="M492,396H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20C512,404.954,503.046,396,492,396z"/>
                                </svg>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarToggler">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <NavLink className="nav-link" to='/'>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#">Funerals</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#">Celebrants</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#">Headstones</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#">Guides</NavLink>
                                    </li>
                                    <li className="nav-item d-lg-none">
                                        <NavLink className="nav-link" href="#">Contact Us</NavLink>
                                    </li>
                                    <li className="nav-item d-lg-none">
                                        <LoginLink/>
                                        {/*<NavLink onClick={() => setShowForm(true)} className="nav-link" href="#">Login</NavLink>*/}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="col col-md-3 d-none d-lg-block header_btn_wrapper">
                        <NavLink href="#" className="btn btn-clear">Contact Us</NavLink>
                        { !currentUser
                            ? <CurrentUserDropdown/>
                            : <LoginBtn/>
                        }



                    </div>

                </div>
            </div>
        </header>
    );
}
