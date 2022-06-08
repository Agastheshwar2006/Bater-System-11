import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyBQCPe7YCFj_gd5M7UXOrLy9w6TDaFsgVs",
    authDomain: "borrowtocaptureapp.firebaseapp.com",
    projectId: "borrowtocaptureapp",
    storageBucket: "borrowtocaptureapp.appspot.com",
    messagingSenderId: "1017212856978",
    appId: "1:1017212856978:web:98c8840eb564418b9fd44b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
