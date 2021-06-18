import React from 'react';
import dummy from '../../images/dummy.png'
import './eventDetails.css'

const UserList = () => {
    return (
        <div className='pl-4 flex-grow-1'>
            <div className=' pt-3 user-list-section'>
                <h5 className='pl-4 text-light'>Participants</h5>
                <div>
                    <div className='d-flex user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light'>
                            <div className='space-medium' >Display Name</div>
                            <div className="space-light">@username</div>

                        </div>


                    </div>
                    <div className='d-flex user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light'>
                            <div className='space-medium' >Display Name</div>
                            <div className="space-light">@username</div>

                        </div>


                    </div>
                    <div className='d-flex user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light'>
                            <div className='space-medium' >Display Name</div>
                            <div className="space-light">@username</div>

                        </div>


                    </div>
                    <div className='d-flex user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light'>
                            <div className='space-medium' >Display Name</div>
                            <div className="space-light">@username</div>

                        </div>


                    </div>
                    <div className='d-flex user-list-sub-section'>
                        <div className='user-list-thumb-wrapper'>
                            <img src={dummy} alt=""/>
                        </div>
                        <div className='ml-3 text-light'>
                            <div className='space-medium' >Display Name</div>
                            <div className="space-light">@username</div>

                        </div>


                    </div>

                </div>


            </div>
        </div>
    );
};

export default UserList;