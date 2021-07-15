import React from 'react';
import back_arrow from "../images/back_arrow.svg";
import { useHistory } from "react-router-dom";

function BackButton(props) {
    let history = useHistory();
    return (
        <img onClick={() => history.goBack()} className='sm-view  back-arrow' src={back_arrow} alt=""/>
    );
}

export default BackButton;