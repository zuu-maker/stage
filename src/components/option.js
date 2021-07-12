import React,{useRef} from 'react';
import {useForm} from "../contexts/formContext";


function Option({option}) {
    return (
        <>
            <option  className='sport-opt' value={option.Sport}>{option.Sport}</option>
        </>
    );
}

export default Option;