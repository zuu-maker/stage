import React, {useEffect, useState} from 'react';
import Header from "../header/header";
import Sidebar from "./sidebar";
import wallet from '../../images/wallet.svg'
import {useAuth} from "../../contexts/authContext";
import deposit from "../../images/deposit.png";
import Paypal from "../../components/paypal";
import {getRealtimeChild, getRealtimeDoc} from "../../helper/helper";
import {useTransaction} from "../../contexts/transactionContext";
import TransactionCard from "../../components/transactionCard";
import BackButton from "../../components/backButton";

function Deposit(props) {
    const {currentUser, user} = useAuth()
    const [clickedDeposit, setClickedDeposit] = useState(false)
    const [loading, setLoading] = useState(false)
    const {transactions, setTransactions} = useTransaction()
    const [amount, setAmount] = useState()
    const transactionList = []
    const {depositSuccess, setDepositSuccess, depositError, setDepositError} = useTransaction()


    useEffect(() => {
        setLoading(true)
        //Get an array of participants that match the current user Is
        getRealtimeChild('Transaction', 'userId', currentUser.uid).on('value', async (snapshot) => {
            snapshot.forEach((doc) => {
                transactionList.push(doc.val())
            })
            setTransactions([])
            await setTransactions(transactionList)
        })
        setLoading(false)
        setAmount(0)
        setClickedDeposit(false)


    }, [])
    return (
        <>
            <Header/>
            <div className={` user container`}>
                <div className={`d-flex`}>
                    <div className={`lg-view`}>

                        <Sidebar/>
                    </div>

                    <div className='text-light flex-column d-flex flex-grow-1 align-items-center justify-content-center'>
                        <div className={`mt-4 mr-auto`}>
                            <BackButton/>
                        </div>
                        <div className={`icon-wrapper`}>
                            <img src={wallet} alt=""/>

                        </div>
                        <h3>$ {user.balance}</h3>
                        <h5 className={``}>Total balance</h5>
                        <p className={`text-success`}>{depositSuccess}</p>
                        <p className={`text-danger`}>{depositError}</p>
                        {
                            clickedDeposit ? <>
                                    <form action="">
                                        <input  defaultValue={1} className={`${depositError === "" ? 'text-light' : 'text-danger'}`} onChange={(e) => {
                                            setAmount(e.target.value)
                                        }} placeholder={`Amount in USD`} type="number"/>
                                    </form>
                                </> :
                                <></>
                        }
                        <button disabled={loading} onClick={() => {
                            setClickedDeposit(true)
                        }} style={{backgroundImage: `url(${deposit})`}} className={`btn icon-btn btn-clear`}>
                            {!loading ? 'Deposit' : 'Depositing...'}

                        </button>
                        {
                            amount < 0 ? setDepositError('Amount to deposit must be more than $0') : setDepositError('')
                        }
                        {
                            clickedDeposit  && amount && depositError === ""?
                                <Paypal currentBalance={user.balance} amount={amount} userId={currentUser.uid}
                                        email={currentUser.email}/>
                                :
                                <></>
                        }
                        <div className='menu-options container-fluid'>
                            {!loading && transactions && transactions?.map((transaction) => {
                                return (

                                    <TransactionCard details={transaction} key={transaction.transactionId}/>
                                )
                            })
                            }


                        </div>

                    </div>
                </div>

            </div>

        </>);
}

export default Deposit;