import React from 'react';

function Bar({value,day}) {
    return (
        <div className={`d-flex flex-column align-items-center flex-grow-1`}>
            <div className={'bar-container'}>
                <div style={{ height: value+'%' }} className={`vertical-progress-bar`}>

                </div>

            </div>
            <div className={`axis text-light mt-2 text-center`}>{day}</div>

        </div>

    );
}

export default Bar;