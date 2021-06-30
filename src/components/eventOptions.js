import React,{useRef} from 'react';
import {useForm} from "../contexts/formContext";
import dropdown from "../images/sort.png";
import Option from "./option";




function EventOptions({eventOption}) {

    return (


            <>
                { eventOption && eventOption ? eventOption.map( o => {return(<option  value={o}>{o}</option>)}) : <option  >Null</option>}


        </>



    );
}

export default EventOptions;