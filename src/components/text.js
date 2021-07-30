import React from 'react';

const Text = ({text,loading}) => {
    return (

            <div className='chat-text-container'>
                <span className={loading && 'animated-background'}>{text}</span>

            </div>

    );
};

export default Text;