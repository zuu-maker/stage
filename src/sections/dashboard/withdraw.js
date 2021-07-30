import React, {useEffect, useState} from 'react';
import Header from "../header/header";
import Sidebar from "./sidebar";
import Card from "../events/card";
import axios from "axios";
import {useTransaction} from "../../contexts/transactionContext";
import {getRealtimeChild, pushRealData, updateFirebaseDocument, updateFirestoreDocument} from "../../helper/helper";
import wallet from "../../images/wallet.svg";
import withdraw from "../../images/withdraw.png";
import Paypal from "../../components/paypal";
import TransactionCard from "../../components/transactionCard";
import {useAuth} from "../../contexts/authContext";
import BackButton from "../../components/backButton";
import { useStateValue } from '../../contexts/StateProvider';

function Withdraw(props) {
    // const {user, userData} = useAuth()
    const [{user, userData}] = useStateValue()

    const [clickedWithdraw, setClickedWithdraw] = useState(false)
    const [loading, setLoading] = useState(false)
    const {transactions, setTransactions} = useTransaction()
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const transactionList = []
    const handleWithdrawal = (e) => {
        setLoading(true)
        if (amount && amount > userData.balance) {
            setError('Withdrawal amount exceeds your balance')
            setLoading(false)
        }
          else if(amount <= 0){
            setError('Withdrawal amount cannot be less than or equal to $0')
            setLoading(false)
            }
         else {


            setError('')


            setClickedWithdraw(true)
            e.preventDefault()
            var payload = "grant_type=client_credentials"
            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': 'en_US',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa('AWFMDaIbnhQ8o53imZkezc7GL5OJyMRS9y4AQ0-z5m1fjlWwh5jgIFkzcDOttyO4WnomsBE-EuAEpPgI:EJONsqVGaVO0FV93AyGIwXATagX_fpfm7O0ULcdANV3MfLmn5CGdfUlNJgfX66YQMyHo3BFMlMr9SKs2')
                }
            }
            axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', payload, config)
                .then(async (response) => {
                    const accessToken = response.data.access_token;
                    console.log(response.data)
                    let payoutConfig = {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + response.data.access_token
                        }
                    }
                    let payoutData = {
                        "sender_batch_header": {
                            "email_subject": "You have a payment",
                            "sender_batch_id": Math.random().toString(),
                            "recipient_type": "EMAIL",

                        },
                        "items": [
                            {
                                "amount": {
                                    "value": amount,
                                    "currency": "USD"
                                },
                                "receiver": user.email,
                                "note": "Withdrawal",
                                "sender_item_id": `i-${user.uid}`
                            }
                        ]
                    }

                    axios.post('https://api.sandbox.paypal.com/v1/payments/payouts', payoutData, payoutConfig)
                        .then(response => {
                            console.log(response.data)
                            const linksArray = response.data.links
                            const [url] = linksArray
                            console.log(accessToken)
                            const detailsHeader = {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + accessToken
                                }
                            };
                            // const requestFields

                            axios.get(url.href, detailsHeader)
                                .then((response => {
                                    console.log(response.data)
                                    const [payout] = response.data.items
                                    const withdrawData = {
                                        dateTime: response.data.batch_header.time_created,
                                        deviceType: '',
                                        receiverAccountId: payout.payout_item_id,
                                        senderAccountId: payout.payout_item.sender_item_id,
                                        status: payout.transaction_status,
                                        transactionAmount: payout.payout_item.amount.value,
                                        transactionId: response.data.batch_header.payout_batch_id,
                                        transactionType: "Withdrawal",
                                        userDataEmailId: payout.payout_item.receiver,
                                        userDataId: user.uid,
                                        userDataMobileNumber: '',

                                    }
                                    pushRealData('Transaction', withdrawData)
                                        .then((snapshot) => {
                                            //Update userData balance in firestore userData document
                                            updateFirestoreDocument('userDatas', user.uid, {balance: parseInt(userData.balance) - amount})
                                                .then(() => {

                                                    //Update userData balance in firebase userData document
                                                    updateFirebaseDocument('userDatas', user.uid, {balance: parseInt(userData.balance) - amount})
                                                        .catch(e => console.log(e))
                                                    setSuccess('Withdrawal successful')

                                                })
                                                .catch(e => {
                                                        console.log(e)
                                                        setError('Withdrawal unsuccessful')

                                                    }
                                                )
                                        })
                                        .catch(e => {
                                            console.log(e.message)
                                            setError('Withdrawal unsuccessful')

                                        })

                                }))
                                .catch(error => {
                                    console.log(error.message)
                                    setError('Withdrawal unsuccessful')

                                })
                        })
                        .catch((error) => {
                            console.log(error.message)
                            setError('Withdrawal unsuccessful')

                        })
                })
                .catch(function (error) {
                    console.log(error.message)
                    setError('Withdrawal unsuccessful')

                })
                .catch(error => {
                    console.log(error.message)
                    setError('Withdrawal unsuccessful')

                })
            setLoading(false)
        }
    }


    useEffect(() => {
        setLoading(true)
        setError('')
        setSuccess('')
        //Get an array of participants that match the current userData Is
        getRealtimeChild('Transaction', 'userDataId', user.uid).on('value', async (snapshot) => {
            snapshot.forEach((doc) => {
                transactionList.push(doc.val())
            })
            setTransactions([])
            await setTransactions(transactionList)
        })
        setLoading(false)


    }, [])
    return (
        <>
            <Header/>
            <div className={` userData container`}>
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
                        <h3>$ {userData.balance}</h3>
                        <h5 className={``}>Total balance</h5>
                        <p className={`text-danger`}>{error}</p>
                        <p className={`text-success`}>{success}</p>
                        <form action="">
                            <input className={`${error === "" ? 'text-light' : 'text-danger'}`} onChange={(e) => {
                                setAmount(parseInt(e.target.value))
                            }} defaultValue={amount} placeholder={`Amount in USD`} type="number"/>
                        </form>
                        {/*{*/}
                        {/*    amount < 0 ? setError('Amount to withdraw must be more than $0') : setError('')*/}
                        {/*}*/}
                        <button disabled={loading} onClick={handleWithdrawal}
                                style={{backgroundImage: `url(${withdraw})`}}
                                className={`btn w-50  text-danger border-danger icon-btn btn-clear`}>
                            {!loading ? 'Withdraw' : 'Withdrawing...'}
                        </button>

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


export default Withdraw;