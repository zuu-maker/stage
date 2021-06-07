
import firebase from "firebase/app";
import 'firebase/auth'

// Initialize Firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyAXRsm-FonzmIxTC6DJl5uAIpvNNGcojQk",
    authDomain: "game-ac16d.firebaseapp.com",
    databaseURL: "https://game-ac16d-default-rtdb.firebaseio.com",
    projectId: "game-ac16d",
    storageBucket: "game-ac16d.appspot.com",
    messagingSenderId: "220341046428",
    appId: "1:220341046428:web:941120e4ea7d2011def159",
    measurementId: "G-09XQ9CTDLD"
})


// firebase.analytics();
export const auth =app.auth()
export default app