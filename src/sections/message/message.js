import React from 'react';
import {CreateEventBtn} from "../modal/modal";
import Search from "../search/search";
import MessageCard from "../../components/messageCard";
import MobileNavbar from "../../components/mobileNavbar";

function Message(props) {
    return (
        <>
            <div className='message p-3'>
                <div className='sm-view '>
                    <div className='  d-flex justify-content-center align-items-center pt-4'>
                        <div className='flex-grow-1'>
                            <h4 className='text-light'>Messages</h4>
                            <p>Talk with your friends</p>


                        </div>

                        <div className="search-container flex-grow-1 ">
                            <div className='search d-flex float-right'>
                                <CreateEventBtn/>
                            </div>


                        </div>

                    </div>
                    <Search/>

                </div>
                <MessageCard/>
            </div>
            <MobileNavbar/>
        </>


);
}

export default Message;