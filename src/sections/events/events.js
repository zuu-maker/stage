import React from 'react';
import Search from "../search/search";
import Header from "../header/header";
import './events.css'
import Category from "./category";
import Card from "./card";
import thumb from '../../images/dummy.png'
import basketball from'../../images/basketball.png'
import {CreateEventBtn} from '../modal/modal'
import CardList from '../events/getEvents'
import MobileNavbar from "../../components/mobileNavbar";
import {useAuth} from "../../contexts/authContext";
import {useUser} from "../../contexts/userContext";


function Events() {
    const {currentUser} =useAuth()

    return (
        <>
        <div  className='container events body'>
            <Header/>

            <div className='lg-view'>
                <div className=' d-flex align-items-center pt-4'>
                    <h4 className=' text-light'>All Events</h4>

                    <div className="search-container flex-grow-1 ">
                        <div className='search d-flex float-right'>
                            <Search/>
                            <CreateEventBtn/>
                        </div>


                    </div>
                </div>

            </div>
            <div className='sm-view pl-4 pr-4'>
                <div className='  d-flex justify-content-center align-items-center pt-4'>
                    <div className='flex-grow-1'>
                        { currentUser ? <h4 className='text-light'>Hi {currentUser.displayName},</h4> :  <h4 className='text-light'>All Events</h4>}
                    <p>Let's Discover a new Adventure</p>


                    </div>

                    <div className="search-container flex-grow-1 ">
                        <div className='search d-flex float-right'>
                            <CreateEventBtn/>
                        </div>


                    </div>

                </div>
                <Search/>

            </div>
            <Category/>
            <div className='grid-container'>
              <CardList  />

            </div>

        </div>
            <MobileNavbar />
        </>
    );
}

export default Events;
