import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// import { initializeApp, credential as _credential, firestore } from 'firebase-admin';
// import firebase from 'firebase/app';
// import Timestamp from 'time-stamp';

//  import serviceAccount from './ServiceAccountKey.json';
//  initializeApp({
//     credential: _credential.cert(serviceAccount)
//  });
// const db = firestore();

// db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
// .then(function() {
//     console.log("Document successfully written!");
// })
// .catch(function(error) {
//     console.error("Error writing document: ", error);
// });
// console.log('haha');

