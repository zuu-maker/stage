import React,{useRef} from 'react';
import {useForm} from "../contexts/formContext";
import dropdown from "../images/sort.png";
import Option from "./option";




function EventOptions({eventOption}) {

    return (


        <>
            <>
                <option  value={eventOption.Sport}>{eventOption.Sport}</option>
            </>

        </>



    );
}

export default EventOptions;