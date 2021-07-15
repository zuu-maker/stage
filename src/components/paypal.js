import React, {useState} from 'react';
import {PayPalButton} from "react-paypal-button-v2";
import {pushRealData, updateFirebaseDocument, updateFirestoreDocument} from "../helper/helper";
import {useTransaction} from "../contexts/transactionContext";

function Paypal({amount,email,userId,currentBalance}) {
    const {depositSuccess,setDepositSuccess,depositError,setDepositError} = useTransaction()

    // function getMobileOperatingSystem() {
    //     var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    //
    //     // Windows Phone must come first because its UA also contains "Android"
    //     if (/windows phone/i.test(userAgent)) {
    //         return "Windows Phone";
    //     }
    //
    //     if (/android/i.test(userAgent)) {
    //         return "Android";
    //     }
    //
    //     // iOS detection from: http://stackoverflow.com/a/9039885/177710
    //     if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    //         return "iOS";
    //     }
    //
    //     return "unknown";
    // }
         //
         // function getOs(){
         //     var OSName="Unknown OS";
         //     if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
         //     if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
         //     if (navigator.appVersion.indexOf("Android")!=-1) OSName="Android";
         //     if (navigator.appVersion.indexOf("iOS")!=-1) OSName="iOS";
         //
         // }

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