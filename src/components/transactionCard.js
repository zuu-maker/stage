import React from 'react';
import deposit from "../images/deposit.png";

function TransactionCard({details}) {
    return (
        <div  className=' m-3 pointer  menu-item'>
            <div className='icon-wrapper'>
                <div className='center'>
                    <img src={deposit} alt=""/>

                </div>
            </div>
            <div className='ml-3 d-flex flex-column'>
                <div className='text-light space-light'>{details.transactionType}</div>
                <small>{details.dateTime}</small>
            </div>
            <div className='mr-0 ml-auto'>
                <span>{details.transactionAmount}</span>
            </div>
        </div>
    );
}

export default TransactionCard;