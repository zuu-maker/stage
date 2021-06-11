import React from 'react';
import './events.css'
import LoginLink from "../login/loginMobile";

function Category(props) {
    return (
        <nav className='mt-4 mb-4 navbar navbar-expand-lg'>
            <div className="" id="">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a href="#" className="btn btn-clear">All</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-clear">Football</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-clear">Tennis</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-clear">Cricket</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-clear">Basketball</a>
                    </li>
                    <li className="nav-item ">
                        <a href="#" className="btn btn-clear">Rugby</a>
                    </li>
                    <li className="nav-item ">
                        <a href="#" className="btn btn-clear">TableTennis</a>
                    </li>
                    <li className="nav-item ">
                        <a href="#" className="btn btn-clear">Badminton</a>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Category;