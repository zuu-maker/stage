import React,{useRef} from 'react';
import basketball from "../../images/basketball.png";
import schedule from "../../images/created_schedule.png";
import trophy from "../../images/trophy.png";
import back_arrow from "../../images/back_arrow.svg";
import participants from "../../images/participants.png";
import puma from "../../images/982449831d9206873c5c48552ee07e42.png";
import adiddas from "../../images/adidas_brand.png";
import nike from "../../images/nike-squarelogo-1486596898031.png";
import dummy from "../../images/dummy.png";
import {timeConverter} from '../../helper/helper'
import './eventDetails.css'

function EventSection({event},{participantList}) {
    const commisionerId = useRef()
    const secondCommissionerId = useRef()
    const participantId = useRef()
    const startDate = timeConverter(parseInt(event.EventStartDate));
    const endDate = timeConverter(parseInt(event.EventEndDate));
    return (
        <>
            <div className=' event-detail-container flex-column'>
                <div className=' mb-4 position-relative overflow-hidden m-0 border-0 grid-item event-card'>
                    <img className='  back-arrow' src={back_arrow} alt=""/>

                    <div className='cover-img-wrapper'>
                        <img src={basketball} alt=""/>
                    </div>

                    <button className='ml-auto mr-0  text-light btn-danger difficulty-btn '
                            value=''>{event.EventDifficulty}
                    </button>

                </div>
                <div className='event-info'>
<div className='lg-view'>
    <div className='d-flex  align-items-center'>
        <p className='event-detail-title text-light'>{event.EventName}</p>
        <div className='join-btn'>
            <button className='   btn  '>Join Event</button>

        </div>
    </div>
    <div className='d-flex card-category'>
        <p className='cost  '>${event.EventEntryFee}</p>
        <p className='ml-5  '>{event.Eventsport}</p>


    </div>
</div>
                    <div className='sm-view'>
                        <div className='d-flex  flex-wrap align-items-center'>
                            <p className='event-detail-title text-light'>{event.EventName}</p>
                            <p className='cost  ml-auto mr-0 text-right'>${event.EventEntryFee}</p>


                            <div className='join-btn'>
                                <button className='   btn  '>Join Event</button>

                            </div>
                        </div>
                        <p className=''>{event.Eventsport}</p>



                    </div>
                    <div className='d-flex flex-wrap '>
                        <p className=' text-light event-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem distinctio pariatur
                            voluptates. Delectus, eum, tenetur? Consequatur esse, ipsam modi nam nemo numquam
                            perspiciatis quis unde vero! Ab eaque perferendis quod!</p>
                    </div>
                    <div className='mb-3 about-section'>
                        <h5 className='text-light mt-4 mb-4'>About</h5>
                        <div className='d-flex event-icon-container'>
                            <div className='d-flex  icon-item align-items-center flex-grow-1'>
                                <div className='icon-wrapper'>
                                    <div className='center'>
                                        <img src={schedule} alt=""/>

                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <div className='text-light f-20 about-upper-info'>{startDate} - {endDate }</div>
                                    <div className='text-light about-low-info'>Start Date - End Date</div>
                                </div>
                            </div>
                            <div className='d-flex  icon-item align-items-center flex-grow-1'>
                                <div className='icon-wrapper'>
                                    <div className='center'>
                                        <img src={participants} alt=""/>

                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <div className='text-light about-upper-info'>{participantList}/{event.EventMaximumParticipants}</div>
                                    <div className='text-light about-low-info'>Joined/Total Participants</div>
                                </div>
                            </div>
                            <div className='d-flex  icon-item align-items-center flex-grow-1'>
                                <div className='icon-wrapper'>
                                    <div className='center'>
                                        <img src={trophy} alt=""/>

                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <div className='text-light about-upper-info'>${event.EventTotalPrizes}</div>
                                    <div className='text-light about-low-info'>Prize</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
<div className='commissioner-section'>
                        <h5 className='text-light mt-4 mb-4'>Commissioner</h5>
                        <div className='d-flex commissioner-icon-container space-light'>
                            <div className='d-flex flex-grow-1'>
                                { event.EventCommissionerId && event.EventCommissionerId != 'None'?<>
                                        <div id={event.EventCommissionerId} ref={commisionerId} className='mr-3 align-items-center'>
                                            <div className='commissioner-icon-wrapper'>
                                                <div className='center'>
                                                    <img src={nike} alt=""/>

                                                </div>
                                            </div>
                                            <p className='text-light text-center mt-2'>{event.EventCommissioner}</p>


                                        </div>

                                    </>  :
                                <></>}
                                <div id={event.EventSecondCommissionerId} ref={secondCommissionerId} className='mr-3 align-items-center'>
                                    <div className='commissioner-icon-wrapper'>
                                        <div className='center'>
                                            <img src={adiddas} alt=""/>

                                        </div>
                                    </div>
                                    <p className='text-light text-center mt-2'>{event.EventSecondCommissioner}</p>


                                </div>
                                { event.EventSecondCommissionerId && event.EventSecondCommissionerId !== 'None'?<>
                                        <div id={event.EventSecondCommissionerId} ref={secondCommissionerId} className='mr-3 align-items-center'>
                                            <div className='commissioner-icon-wrapper'>
                                                <div className='center'>
                                                    <img src={nike} alt=""/>

                                                </div>
                                            </div>
                                            <p className='text-light text-center mt-2'>{event.EventSecondCommissionerId}</p>


                                        </div>

                                    </>  :
                                    <></>}

                            </div>

                        </div>
                    </div>
                    </div>



                </div>
            </div>
        </>
    );
}

export default EventSection;