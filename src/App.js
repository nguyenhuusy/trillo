import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './Component/Header/Header';
//import * as firebase from 'firebase';
import './App.css'
import { database } from "./Firebase";
import Auth from './Component/Auth/Auth';
// const firebaseConfig = {
//   apiKey: "AIzaSyDMY4mf62u8jXfxTBWzbYErH1Qj6sdr3ac",
//   authDomain: "trillo-f5b00.firebaseapp.com",
//   databaseURL: "https://trillo-f5b00.firebaseio.com",
//   projectId: "trillo-f5b00",
//   storageBucket: "trillo-f5b00.appspot.com",
//   messagingSenderId: "822040318359",
//   appId: "1:822040318359:web:5fa40699d91e2232fff4d2",
//   measurementId: "G-KY0LZP232E"
// };
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : null
    };
  }
  // componentDidMount=()=> {
  //   database.ref("/").on('value', () => {
  //     console.log("data change");
  //   });
  // }
  
  render() {
    var docRef = database.collection("infor").doc("DqGeC9gSAAo9cBCyu3Z2");
    docRef.onSnapshot(function(doc) {
  });
    return (
    
    <Provider store={store}>
      <div className="App">
        
      <BrowserRouter>
        <Switch>
              <Route exact path="/" component={ Auth }/>
              <Route path="/project" component={ Header }/>

            </Switch>  
            </BrowserRouter>
      </div>
    </Provider>
  );}
}

export default App;


// function App() {
//   constructor(props){
//     super(props);
//     this.state = {
//       data : null
//     };
//   }
//   componentDidMount=()=> {
//     database.ref("/").on('value', () => {
//       console.log("data change");
//     });
//   }
//   return (
//     <Provider store={store}>
//       <div className="App">
//         <Header />
//         <firebase/>
//       </div>
//     </Provider>
//   );
// }

// export default App;
