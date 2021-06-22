import React, {useEffect, useRef, useState} from 'react';
import './events.css';
import '../../helper/helper'
import {getDoc, getOptions, pushData} from "../../helper/helper";
import calendar from "../../images/created_schedule.png";
import dropdown from "../../images/sort.png"
import {useForm} from "../../contexts/formContext";
import {db, realDB} from "../../firebase/firebase";
import Option from "../../components/option";
import {x} from './test'
import EventOptions from "../../components/eventOptions";


export default function EventsForm() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [formOptions, setFormOptions] = useState([])
    const [options, setOptions] = useState([])

    const optionList = () =>{
        const op = [];
        const result = options.forEach((e) => {op.push(e.Difficulty)})

        console.log(op)
        console.log(result)
        return op


    }

    function handleSubmit(e) {
        e.preventDefault()
        var startDate = new Date(e.target.EventStartDate.value).valueOf();
        var endDate = new Date(e.target.EventEndDate.value).valueOf();

        var formData = {


            EventName: e.target.EventName.value,
            Eventsport: e.target.Eventsport.value,
            EventDifficulty: e.target.EventDifficulty.value,
            EventStyle: e.target.EventStyle.value,
            EventStartDate: startDate,
            EventEndDate: endDate,
            EventMaximumParticipants: e.target.EventMaximumParticipants.value,
            EventEntryFee: e.target.EventEntryFee.value,
            EventTimestamp: Date.now()

        }
        try {
            pushData('Events',formData)
        } catch (e) {
            console.log(e.message)

        }


    }

    function handleClickOption() {
        try {

            const docs =getDoc('SportsEvents', 'Sport', this.target.value)
            setOptions( docs)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {


            const collectionList = []

            db.collection('SportsEvents').get().then(snapshot => {


                snapshot.forEach(doc => {
                        const data = doc.data()
                        collectionList.push(data)

                    }
                )
                console.log(collectionList)

                setFormOptions(collectionList)

            })

            setOptions( getDoc('SportsEvents', 'Sport','Football'))
        }, [])

    return (
        <>
            <p className="text-danger">{error}</p>
            <form className="form event-form" onSubmit={handleSubmit}>
                <p className='form-title'>Add New Event</p>
                <div className="input-group">

                    <input name="EventName"
                           type="text" placeholder="Event Name"/>

                    <select className="pointer" onChange={handleClickOption}
                            style={{backgroundImage: `url(${dropdown})`}} name="Eventsport">
                        {formOptions && formOptions.length > 0 ? formOptions.map(option => {
                                return (<Option option={option}/>)
                            }) :
                            <>

                            </>

                        }
                    </select>
                    <select className="pointer" style={{backgroundImage: `url(${dropdown})`}} name="EventDifficulty">
                        {options  ? options.map(eventOption => {
                            return (<EventOptions eventOption={eventOption}/>)
                        }) :

                        <option>Null</option>}

                    </select>

                    <select className="pointer" style={{backgroundImage: `url(${dropdown})`}} name="EventStyle">
                        <option selected value="Season">Season</option>
                        <option value="Tournament">Tournament</option>

                    </select>

                    <input name="EventQuarterLength"
                           type="number" min="2" max="60" step="1" placeholder="Quarter Length (minutes)"
                    />
                    <input name="EventStartDate"
                           type="date" placeholder="Registration Start Date"
                    />


                    <input name="EventEndDate"
                           type="date" placeholder="Registration End Date"
                    />
                    <input name="EventMaximumParticipants"
                           type="text" placeholder="Maximum Number of Participant"/>
                    <input name="EventEntryFee"
                           type="text" placeholder="Entry Fee"/>

                </div>
                <button disabled={loading} style={{background: loading ? '#ffffff' : ''}} type="submit"><span
                    className='form-btn'>Create Event</span></button>
            </form>
        </>
    );

}
