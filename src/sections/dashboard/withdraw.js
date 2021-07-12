import React from 'react';
import Header from "../header/header";
import Sidebar from "./sidebar";
import Card from "../events/card";

function Withdraw(props) {
    return (
        <>
            <Header/>
            <div className={` user container`}>
                <div className={`d-flex`}>
                    <Sidebar/>
                    <div className='flex-column flex-grow-1'>

                        <div className='grid-container'>

                        </div>


                    </div>
                </div>

            </div>

        </>
    );
}

export default Withdraw;