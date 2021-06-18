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


function Events() {

    return (
        <div  className='container events body'>
            <Header/>
                <div className=' d-flex align-items-center pt-4'>
                    <h4 className='text-light'>All Events</h4>
                <div className="search-container flex-grow-1 ">
                <div className='search d-flex float-right'>
                <Search/>
                <CreateEventBtn/>
                </div>


                </div>
            </div>
            <Category/>
            <div className='grid-container'>
              <CardList  />

            </div>

        </div>
    );
}

export default Events;
