//const admin = require('firebase-admin');
import firebase from "firebase";
var firebaseui = require('firebaseui');
// Required for side-effects
require("firebase/firestore");
require("firebase/auth");

// var Timestamp = require('time-stamp');
firebase.initializeApp({
    apiKey: "AIzaSyDMY4mf62u8jXfxTBWzbYErH1Qj6sdr3ac",
  authDomain: "trillo-f5b00.firebaseapp.com",
  databaseURL: "https://trillo-f5b00.firebaseio.com",
  projectId: "trillo-f5b00",
  storageBucket: "trillo-f5b00.appspot.com",
  messagingSenderId: "822040318359",
  appId: "1:822040318359:web:5fa40699d91e2232fff4d2",
  measurementId: "G-KY0LZP232E"
});
var db = firebase.firestore();
var dbinfor=[]
db.collection("infor").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    dbinfor+= doc.data()
      // doc.data() is never undefined for query doc snapshots
      
      //"name_table": doc.name_table
      //escription_table:doc.description_tabl
  });
});
export default firebase;
// vì test thử database nên ta export database trong firebase
export const database = firebase.firestore();
export var fa = firebase.auth();



    
