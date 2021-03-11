import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBgb5bCzwq9xJy30s5XauZ5vdst1FytVIk",
    authDomain: "bt3103-week-6-e3aa2.firebaseapp.com",
    projectId: "bt3103-week-6-e3aa2",
    storageBucket: "bt3103-week-6-e3aa2.appspot.com",
    messagingSenderId: "235727079126",
    appId: "1:235727079126:web:54b6c2dfb0a5a47dd4eb77",
    measurementId: "G-N5C3Q2GWHL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;