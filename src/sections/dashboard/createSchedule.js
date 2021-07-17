import React from 'react';
import Header from "../header/header";
import Sidebar from "./sidebar";
import BackButton from "../../components/backButton";

function CreateSchedule(props) {
    return (
        <>
            <Header/>
            <div className={` user container`}>
                <div className={`d-flex`}>
                    <div className={`lg-view`}>

                        <Sidebar/>
                    </div>
                    <div className='flex-column flex-grow-1'>
                        <div className={`mt-4 sm-view`}>
                            <BackButton/>
                        </div>


                        <div className='grid-container'>

                        </div>


                    </div>
                </div>

            </div>

        </>    );
}

export default CreateSchedule;