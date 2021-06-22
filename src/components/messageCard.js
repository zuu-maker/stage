import React from 'react';
import {Link} from "react-router-dom";
import dummy from "../images/dummy.png";

function MessageCard(props) {
    return (
        <div className=''>
            <div className=' pt-3 user-list-section'>
                <div className='user-list'>
                    <Link to='/message/1' ><div className='d-flex mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >Display Name</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">Hey There! This is just a Test</div>

                        </div>


                    </div></Link>
                    <Link to='/message/1' ><div className='d-flex mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >Display Name</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">Hey There! This is just a Test</div>

                        </div>


                    </div></Link>
                    <Link to='/message/1' ><div className='d-flex mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >Display Name</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">Hey There! This is just a Test</div>

                        </div>


                    </div></Link>
                    <Link to='/message/1' ><div className='d-flex mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >Display Name</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">Hey There! This is just a Test</div>

                        </div>


                    </div></Link>
                    <Link to='/message/1' ><div className='d-flex mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >Display Name</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">Hey There! This is just a Test</div>

                        </div>


                    </div></Link>
                    <Link to='/message/1' ><div className='d-flex mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >Display Name</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">Hey There! This is just a Test</div>

                        </div>


                    </div></Link>
                    <Link to='/message/1' ><div className='d-flex mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >Display Name</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">Hey There! This is just a Test</div>

                        </div>


                    </div></Link>
                    <Link to='/message/1' ><div className='d-flex mb-2 user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light w-100'>
                            <span className='space-medium' >Display Name</span>
                            <span className=' float-right space-light' ><small>11:00PM</small></span>
                            <div className="space-light">Hey There! This is just a Test</div>

                        </div>


                    </div></Link>



                </div>


            </div>

        </div>
    );
}

export default MessageCard;