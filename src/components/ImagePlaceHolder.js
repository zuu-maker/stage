import React from 'react';

function ImagePlaceHolder(props) {
    return (
        <div className={` bg-success image-placeholder`}>
            <span className={`text-light`}>{props.name}</span>
        </div>
    );
}

export default ImagePlaceHolder;