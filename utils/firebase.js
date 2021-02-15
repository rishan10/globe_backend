// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "glonex.firebaseapp.com",
    projectId: "glonex",
    storageBucket: "glonex.appspot.com",
    messagingSenderId: "931476817823",
    appId: "1:931476817823:web:313d7bb5d624bbf1cf9faa",
    measurementId: "G-CBS7EBS1YD"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log(process.env.FIREBASE_API_KEY);


