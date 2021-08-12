
import firebase from "firebase";
import 'firebase/auth'

// Initialize Firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyBW2uCe4KmgFNSfx-VHY4cpM-FvqlwqWgw",
    authDomain: "test-bf96b.firebaseapp.com",
    databaseURL: "https://test-bf96b-default-rtdb.firebaseio.com",
    projectId: "test-bf96b",
    storageBucket: "test-bf96b.appspot.com",
    messagingSenderId: "576273950351",
    appId: "1:576273950351:web:a9b05b0e6386b5767e32fa",
    measurementId: "G-K9WPPLECQB"
});


// firebase.analytics();
const db = app.firestore()
var realDB = app.database()
const auth =app.auth()
const storage =app.storage()
//use this auth
 export {db , auth ,realDB,storage}