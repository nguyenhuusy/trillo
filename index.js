const admin = require('firebase-admin');
const firebase=require('firebase');
require("firebase/auth");
// Required for side-effects
require("firebase/firestore");

// var Timestamp = require('time-stamp');
firebase.initializeApp({
    apiKey: 'AIzaSyDMY4mf62u8jXfxTBWzbYErH1Qj6sdr3ac',
    authDomain: 'trillo-f5b00.firebaseapp.com',
    projectId: 'trillo-f5b00'
});

var fa= firebase.auth()
const email="sy.huunguyen0496@gmail.com";
const password="hhhhhhh";
fa.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
// var a=[];
// db.collection("infor").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
     
        
//         a=doc.data
        
//     });
//   });
  

    
//export default firebase;