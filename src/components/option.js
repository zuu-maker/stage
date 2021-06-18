import React,{useRef} from 'react';
import {useForm} from "../contexts/formContext";


function Option({option}) {
    const {options,setOptions} = useForm()

    const optionRef = useRef()
    return (
        <>
            <option  value={option}>{option.Sport}</option>
        </>
    );
}

export default Option;