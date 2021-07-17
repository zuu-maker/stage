import React, {useEffect, useRef, useState} from 'react';
import './events.css';
import '../../helper/helper'
import {
    getDoc,
    getOptions,
    pushData,
    pushRealData,
    updateDocument,
    updateFirebaseDocument,
    updateFirestoreDocument
} from "../../helper/helper";
import calendar from "../../images/created_schedule.png";
import dropdown from "../../images/sort.png"
import {useForm} from "../../contexts/formContext";
import {db, realDB} from "../../firebase/firebase";
import Option from "../../components/option";
import EventOptions from "../../components/eventOptions";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import {useLoader} from "../../contexts/loaderContext";
import {useAuth} from "../../contexts/authContext";
import {useHistory} from "react-router-dom";
import BackButton from "../../components/backButton";

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

export default function EventsForm() {
    const history =useHistory()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const {setLoader, loader} = useLoader()
    const { currentUser,user} = useAuth()
    const [formOptions, setFormOptions] = useState([])
    const [maxParticipants, setMaxParticipants] = useState([])
    const [eventTotalPrizes, setEventTotalPrizes] = useState(0)
    const [slider, setSlider] = useState({'s1':0,'s2':0,'s3':0,'s4':0})
    const {options, setOptions} = useForm([])
    const [state, setState] = React.useState({checkedB: false});
    const [startDate,setStartDate] = useState(0);
    const [endDate,setEndDate] = useState(0);
    var tota, totb, totc,totd, alltot, altval, getslider;
    var chktot = 100;
    var scrore = 101;

    const handleStartDate = (e) => {
        console.log(e.target.valueAsNumber)
        setStartDate(e.target.valueAsNumber)
    }
    const handleEndDate =  (e) => {
        console.log(e.target.valueAsNumber)

         setEndDate(e.target.valueAsNumber)
        console.log(endDate,'-',startDate)
        console.log(endDate-startDate)
            if (e.target.valueAsNumber-startDate < 0) {

                setError('End date cannot be before the start date')
                setStartDate(0)
                setEndDate(0)
                document.getElementById('startDate').value = ''
                document.getElementById('endDate').value = ''

            }
        else {
               setError('')}
        }


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

//On Change event
    function adjustSlider(e){
        // Get the sliders Id
        getslider = e.target.id;
        setSlider(e.target.ariaValueNow)
        console.log(slider)

        //Gather all slider values
        tota = parseInt(document.getElementById('range1').ariaValueNow);
        totb = parseInt(document.getElementById('range2').ariaValueNow);
        totc = parseInt(document.getElementById('range3').ariaValueNow);
        totd = parseInt(document.getElementById('range4').ariaValueNow);

        alltot = tota + totb + totc +totd;
        // console.log(tota)
        // console.log(alltot)
        //check sliders total if greater than 100 and re-update slider
        if (alltot > chktot) {
            if (getslider == "range1") {
                altval = chktot - totb - totc-totd;
                setSlider({'s1':altval,'s2':0,'s3':0,'s4':0});

            }
            if (getslider == "range2") {
                altval = chktot - tota - totc-totd;
                setSlider({'s1':0,'s2':altval,'s3':0,'s4':0});
            }
            if (getslider == "range3") {
                altval = chktot - tota - totb-totd;
                setSlider({'s1':0,'s2':0,'s3':altval,'s4':0});
            }
            if (getslider == "range4") {
                altval = chktot - tota - totb-totc;
                setSlider({'s1':0,'s2':0,'s3':0,'s4':altval});
            }
        }

    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: 300 + theme.spacing(3) * 2,
        },
        margin: {
            height: theme.spacing(3),
        },
    }));


    ValueLabelComponent.propTypes = {
        children: PropTypes.element.isRequired,
        open: PropTypes.bool.isRequired,
        value: PropTypes.number.isRequired,
    };




    const PrettoSlider = withStyles({
        root: {
            color: '#52af77',
            height: 8,
        },
        thumb: {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            marginTop: -8,
            marginLeft: -12,
            '&:focus, &:hover, &$active': {
                boxShadow: 'inherit',
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)',
        },
        track: {
            height: 8,
            borderRadius: 4,
        },
        rail: {
            height: 8,
            borderRadius: 4,
        },
    })(Slider);







    function maximumParticipants() {
        var e = document.getElementById("event-style");
        var selectedOption = e.options[e.selectedIndex].text;
        {
            selectedOption == 'Exhibition' ? setMaxParticipants(['2'])
                : selectedOption == 'Season' ? setMaxParticipants(['32'])
                : selectedOption == 'Tournament' ? setMaxParticipants(['2', '4', '8', '16', '32', '64'])
                    : selectedOption == 'Franchise' ? setMaxParticipants(['32'])
                        : setMaxParticipants(['32'])
        }

    }
    function totalPrize(e) {
        var o = document.getElementById("event-participants");
        var selectedOption = o.options[o.selectedIndex].text;
        console.log(selectedOption)
        var computation = (parseInt(selectedOption) * e.target.value) - 0.75;
        {computation < 0 ? setEventTotalPrizes(0) :setEventTotalPrizes(computation) }

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
            EventStartDate: e.target.EventStartDate.valueAsNumber,
            EventEndDate: e.target.EventEndDate.valueAsNumber,
            EventCurrentParticipants: 1,
            EventMaximumParticipants: e.target.EventMaximumParticipants.value,
            EventEntryFee: e.target.EventEntryFee.value,
            EventTotalPrizes: e.target.EventTotalPrizes.value,
            EventTimestamp: Date.now(),
            EventCommissioner: currentUser.displayName,
            EventCommissionerId : currentUser.uid,
            EventCommissionerProfile: currentUser.photoURL,
            EventFirstPlacePercent: '',
            EventSecondPlacePercent:'',
            EventThirdPlacePercent:'',
            EventFourthPlacePercent:'',
            EventSecondCommissioner:'Fantasy Sports',
            EventSecondCommissionerId:'',
            EventSecondCommissionerProfile:'',
            EventPrizeTier: document.getElementsByClassName('PrivateSwitchBase-input-4').checkedB.checked

        }
        try {
            if (parseInt(user.balance) >= parseInt(formData.EventEntryFee)) {
                setError('')
                //Set loading state
                setLoader(true)

                    //Remaining balance deducted from the user balance  after Joining event
                    const remainingBalance =  parseInt(user.balance) - parseInt(formData.EventEntryFee)
                    updateFirestoreDocument('Users',currentUser.uid,{balance:remainingBalance})
                        .then(() =>{
                            //Update userBalance in  firebase
                                updateFirebaseDocument('Users',currentUser.uid,{userBalance:remainingBalance})
                                    .catch(e => console.log(e))

                            //Create event
                            pushRealData('Events', formData).then((docRef) =>{
                                console.log(docRef.key)
                                //Update event document with an Id field that matches its reference id
                                //key property returns the documents reference Id
                                updateFirebaseDocument('Events',docRef.key,{id: docRef.key})

                                //Remove user balance property from user object from the auth context
                                var newUserObj = user
                                delete newUserObj['balance']

                                //Add the creator of the event as a participant to firebase participant's collection
                                pushRealData('Participants',Object.assign({},newUserObj , {EventId : docRef.key}))

                            } )
                            setLoader(false)
                            setSuccess('Event created successfully')
                            history.push('/events')
                            }
                        )
                        .catch(e => {
                            setSuccess('')
                            setLoader(false)
                            setError(e)

                            console.log(e)
                        })


            } else{
                setSuccess('')

                console.log(user.balance)
                setError('Please deposit enough funds to create this event. ')

            }
        }


         catch (e) {
            setError(e)
            console.log(e.message)

        }


    }

    async function handleClickOption() {
        let collectionList = []
        var e = document.getElementById("event-sport");
        var selectedOption = e.options[e.selectedIndex].text;

        // const docs = await fgetDoc('SportsEvents', 'Sport', e.target.value)


        await db.collection('SportsEvents').where('Sport', "==", selectedOption).get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    const data = doc.data()
                    collectionList.push(data)
                    console.log(data)

                })


            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        console.log(collectionList)


        setOptions(collectionList)
        console.log(options)

    }

    useEffect(async () => {


        const collectionList = []

        await db.collection('SportsEvents').get().then(snapshot => {


            snapshot.forEach(doc => {
                const data = doc.data()
                collectionList.push(data)

            })


        })
        setFormOptions(collectionList)

        console.log(formOptions)

    }, [])

    return (
        <>
            <p className={`text-danger`}>{error}</p>
            <p className={`text-success`}>{success}</p>
<BackButton/>
            <form className="form event-form" onSubmit={handleSubmit}>
                <p className='form-title'>Add New Event</p>
                <div className="input-group">

                    <input name="EventName" required type="text" placeholder="Event Name"/>

                    <select id='event-sport' className="pointer" required onChange={handleClickOption}
                            style={{backgroundImage: `url(${dropdown})`}} name="Eventsport">
                        <option value="" selected>Choose Event sport</option>
                        {formOptions && formOptions.length > 0 ? formOptions.map(option => {
                                return (<Option option={option}/>)
                            }) :
                            <>

                            </>

                        }
                    </select>
                    <select required className="pointer" style={{backgroundImage: `url(${dropdown})`}} name="QuarterLengths">
                        <option value="" selected>Quarter Length</option>

                        {options ? options.map(eventOption => {
                            return (<EventOptions eventOption={eventOption.QuarterLengths}/>)
                        }) : <option>Null</option>}


                    </select>

                    <input onChange={handleStartDate} required id='startDate' name="EventStartDate"
                           type="date" placeholder="Registration Start Date"
                    />


                    <input  onChange={handleEndDate} id={`endDate`} required name="EventEndDate"
                           type="date" placeholder="Registration End Date"
                    />

                    <select required className="pointer" style={{backgroundImage: `url(${dropdown})`}} name="EventDifficulty">
                        <option value="" selected>Event Difficulty</option>

                        {options ? options.map(eventOption => {
                            return (<EventOptions eventOption={eventOption.Difficulty}/>)
                        }) : <option>Null</option>}

                    </select>

                    <select required id='event-style' onChange={maximumParticipants} className="pointer"
                            style={{backgroundImage: `url(${dropdown})`}} name="EventStyle">
                        <option value="" selected>Event Style</option>

                        {options ? options.map(eventOption => {
                            return (<EventOptions eventOption={eventOption.Style}/>)
                        }) : <option>Null</option>}


                    </select>


                    <select required id='event-participants' className="pointer" style={{backgroundImage: `url(${dropdown})`}} name="EventMaximumParticipants">
                        <option value="" selected>No. of participants</option>

                        {maxParticipants ? <EventOptions eventOption={maxParticipants}/>
                         : <option>Null</option>}


                    </select>

                    <input required name="EventEntryFee" type="number" onChange={totalPrize} placeholder="Entry Fee"/>
                    <input  name="EventTotalPrizes" value={eventTotalPrizes} disabled type="text" placeholder="Projected Total Prize"/>
                    <div className='switch-container d-flex center'>
                        <span>Default Prize Tier</span>
                        <Switch className='mr-0 ml-auto'
                            checked={state.checkedB}
                            onChange={handleChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                    {/*<PrettoSlider id='range1' onChange={adjustSlider} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} aria-valuenow={slider} />*/}
                    {/*<PrettoSlider id='range2' onChange={adjustSlider} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} aria-valuenow={slider} />*/}
                    {/*<PrettoSlider id='range3' onChange={adjustSlider} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} aria-valuenow={slider} />*/}
                    {/*<PrettoSlider id='range4' onChange={adjustSlider} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} aria-valuenow={slider} />*/}
                    {/*<Slider onChange={adjustSlider} id='range1' aria-valuenow={slider.s1} ValueLabelComponent={ValueLabelComponent} aria-label="custom thumb label" aria-labelledby='range1' defaultValue={0}/>*/}
                    {/*<Slider onChange={adjustSlider} id='range2' aria-valuenow={slider.s2} ValueLabelComponent={ValueLabelComponent} aria-label="custom thumb label" aria-labelledby='range1' defaultValue={0}/>*/}
                    {/*<Slider onChange={adjustSlider} id='range3' aria-valuenow={slider.s3} ValueLabelComponent={ValueLabelComponent} aria-label="custom thumb label" aria-labelledby='range1' defaultValue={0}/>*/}
                    {/*<Slider onChange={adjustSlider} id='range4' aria-valuenow={slider.s4} ValueLabelComponent={ValueLabelComponent} aria-label="custom thumb label" aria-labelledby='range1' defaultValue={0}/>*/}

                </div>
                <button disabled={loader} style={{background: loader ? '#ffffff' : ''}} type="submit"><span
                    className='form-btn'>Create Event</span></button>

            {/*<input id="range1" className="slider" type="range" min="0" max="100" value='' />*/}
            {/*<input id="range2" className="slider" type="range" min="0" max="100" value='0' />*/}
            {/*<input id="range3" className="slider" type="range" min="0" max="100" value='0' />*/}
            </form>
        </>
    );

}
