import React from 'react';

const Icon = ({props}) => {
    return (
            <div style={{backgroundColor: props.backgroundColor}} className='icon-wrapper pointer'>
                <div className='center'>
                    <img src={props.image} alt=""/>

                </div>
            </div>

    );
};

export default Icon;