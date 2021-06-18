import React,{useRef} from 'react';
import {useForm} from "../contexts/formContext";
import dropdown from "../images/sort.png";
import Option from "./option";


function OptionList() {
    const {options,setOptions} = useForm()

    return (
        <>
            <select className="pointer" style={{backgroundImage: `url(${dropdown})`}} name="EventDifficulty" >
                { options ? console.log(options.map( o => {return(o.Difficulty)}))



                    :
                    <option value="None">None</option>
                }



            </select>
        </>
    );
}

export default OptionList;