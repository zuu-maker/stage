import React, {useState} from 'react';
import {PayPalButton} from "react-paypal-button-v2";
import {pushRealData, updateFirebaseDocument, updateFirestoreDocument} from "../helper/helper";
import {useTransaction} from "../contexts/transactionContext";

function Paypal({amount,email,userId,currentBalance}) {
    const {depositSuccess,setDepositSuccess,depositError,setDepositError} = useTransaction()

    return (
        <PayPalButton
            amount={amount}
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
                var receiverId =details.purchase_units.map(eachObj =>{
                    return eachObj.payee.merchant_id
                })

                details.purchase_units.forEach(o =>{
                     const [paymentInfo] =  o.payments.captures.map(item => item)

                })

                const [paymentInfo] = details.purchase_units
                const [captures] = paymentInfo.payments.captures

                const depositData = {
                    dateTime: details.update_time,
                    deviceType: '',
                    receiverAccountId: paymentInfo.payee.merchant_id,
                    senderAccountId: details.payer.payer_id,
                    status: details.status,
                    transactionAmount: paymentInfo.amount.value,
                    transactionId: captures.id,
                    transactionType: "Deposit",
                    userEmailId:email,
                    userId: userId,
                    userMobileNumber: details.payer.phone.phone_number.national_number,

                }

                // Push transaction data to the Transactions collection in firebase
                return pushRealData('Transaction',depositData)
                    .then((snapshot) =>{
                        //Update user balance in firestore User document
                        updateFirestoreDocument('Users', userId, {balance: parseInt(currentBalance) + parseInt(amount)})
                            .then(() => {

                                //Update user balance in firebase User document
                                updateFirebaseDocument('Users', userId, {userBalance: parseInt(currentBalance) + parseInt(amount)})
                                    .catch(e => console.log(e))
                                setDepositSuccess('Deposited successfully')
                            })
                            .catch(e => {
                                console.log(e)
                                setDepositError(e.message)
                            })
                    })
                    .catch(e=>{
                        console.log(e.message)
                        setDepositError(e.message)

                    })

            }}
        />
    );
}

export default Paypal;