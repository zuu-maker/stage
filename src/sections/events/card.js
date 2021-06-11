import React from 'react';

function Card(props) {
  const hard={background:'#D50000'}
  const normal={background:'#D48600'}
  const easy={background:'#18FF00'}
    return (
        <card className='card overflow-hidden border-0 event-card'>

                <div className='cover-img-wrapper'>
                    <img src={props.coverImage} alt=""/>
                </div>
            <card className='card-body
            '>
                <div className='d-flex  align-items-center'>
                    <p className='card-title'>{props.title}</p>
                <p className='cost flex-grow-1 text-right '>${props.cost}</p>
                </div>
                <p className='card-category'>
                    {props.category}
                </p>
                <div className='d-flex flex-grow-1'>
                    <div className='thumbnail-list d-flex flex-row'>
                        <li className='thumbnail-wrapper'><img src={props.userThumbnail} alt=""/></li>
                        <li className='thumbnail-wrapper'><img src={props.userThumbnail} alt=""/></li>
                        <li className='thumbnail-wrapper'><img src={props.userThumbnail} alt=""/></li>

                        <li className='thumbnail-wrapper'><img src={props.userThumbnail} alt=""/></li>


                    </div>
                    <p className='spots'> +{props.attendees} going ({props.spotsLeft} spots left)</p>

                </div>

                <div className=' w-100 card-footer d-flex justify-content-center flex-grow-1'>
                    <p className='m-0 prize text-light'>
                        Price: {props.prize}
                    </p>
                    <button className='ml-auto mr-0  text-light btn-danger difficulty-btn ' value='Hard'>Hard</button>
                </div>
            </card>
        </card>
    );
}



export default Card;
