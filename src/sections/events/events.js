import React from 'react';
import Search from "../search/search";
import Header from "../header/header";
import './events.css'
import Category from "./category";
import Card from "./card";
import thumb from '../../images/dummy.png'
import basketball from'../../images/basketball.png'


function Events(props) {
    return (
        <div className='container body'>
            <Header/>
                <div className=' d-flex align-items-center pt-4'>
                    <h4 className='text-light'>All Events</h4>
                <div className="search-container flex-grow-1 ">
                    <Search/>

                </div>
            </div>
            <Category/>
            <div className='grid-container'>
                <Card className='grid-item'title='Basketball Tournament' coverImage={basketball} category='Basketball' cost='45' attendees='56' userThumbnail={thumb} prize='400' difficulty='Normal'/>
                <Card className='grid-item'title='Basketball Tournament' coverImage={basketball} category='Basketball' cost='45' attendees='56' userThumbnail={thumb} prize='400' difficulty='Normal'/>
                <Card className='grid-item'title='Basketball Tournament' coverImage={basketball} category='Basketball' cost='45' attendees='56' userThumbnail={thumb} prize='400' difficulty='Normal'/>
                <Card className='grid-item'title='Basketball Tournament' coverImage={basketball} category='Basketball' cost='45' attendees='56' userThumbnail={thumb} prize='400' difficulty='Normal'/>
                <Card className='grid-item'title='Basketball Tournament' coverImage={basketball} category='Basketball' cost='45' attendees='56' userThumbnail={thumb} prize='400' difficulty='Normal'/>
                <Card className='grid-item'title='Basketball Tournament' coverImage={basketball} category='Basketball' cost='45' attendees='56' userThumbnail={thumb} prize='400' difficulty='Normal'/>
                <Card className='grid-item'title='Basketball Tournament' coverImage={basketball} category='Basketball' cost='45' attendees='56' userThumbnail={thumb} prize='400' difficulty='Normal'/>

            </div>

        </div>
    );
}

export default Events;
