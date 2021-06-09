
import firebase from "firebase";
import 'firebase/auth'

// Initialize Firebase
const app = firebase.initializeApp({
                apiKey: "AIzaSyBP0-OF5crcXxZBd3hFynYzggVEmiL1wQA",
                authDomain: "fantasysports-7117e.firebaseapp.com",
                databaseURL: "https://fantasysports-7117e.firebaseio.com",
                projectId: "fantasysports-7117e",
                storageBucket: "fantasysports-7117e.appspot.com",
                messagingSenderId: "1046550299001",
                appId: "1:1046550299001:web:703f884a8e46b80fd22fa8",
                measurementId: "G-CRGM75XEXX"
});


// firebase.analytics();
const db = app.firestore()
var realDB = app.database()
 const auth =app.auth()
export {db , auth ,realDB}