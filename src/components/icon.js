import React from 'react';

const Icon = ({props}) => {
    return (
            <div style={{backgroundColor: props.backgroundColor}} className='icon-wrapper ml-2 pointer'>
                <div className='center'>
                    <img src={props.image} alt=""/>

                </div>
            </div>

    );
};

export default Icon;