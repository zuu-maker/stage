import React, {useState} from 'react';
import './events.css'
import LoginLink from "../login/loginMobile";
import {eventFilter} from "../../helper/helper";
import {useEvent} from "../../contexts/eventsContext";
import {useLoader} from "../../contexts/loaderContext";

function Category(props) {
    const {eventsList,setEventsList} = useEvent()
    const [loader,setLoader] = useState();



    function handleClick(e) {
        e.preventDefault()

        try {
            setLoader(true)
            const l = eventFilter('Eventsport',e.target.value)
            setEventsList(l)
            setLoader(false)

        } catch (err) {
            console.log(err.message)
            setLoader(false)

        }
    }
    return (
        <nav className='mt-4 mb-4 navbar navbar-expand-lg'>
            {loader  ? <>
                    <div className="loader">
                        <div className="bar">

                        </div>
                    </div>
                </>
                : <div></div>}
            <div className="" id="">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='All'>All</button>
                    </li>
                    <li className="nav-item">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Football'>Football</button>
                    </li>
                    <li className="nav-item">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Tennis'>Tennis</button>
                    </li>
                    <li className="nav-item">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Cricket'>Cricket</button>
                    </li>
                    <li className="nav-item">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Basketball'>Basketball</button>
                    </li>
                    <li className="nav-item ">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Rugby'>Rugby</button>
                    </li>
                    <li className="nav-item ">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='TableTennis'>TableTennis</button>
                    </li>
                    <li className="nav-item ">
                        <button href="#" className="btn btn-clear" onClick={handleClick} value='Badminton'>Badminton</button>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Category;