import React, { Component } from 'react';
import './Auth.scss';
import firebase from "firebase";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {fa} from '../../Firebase';
import {database} from '../../Firebase';
import {save_id} from '../../redux/actions/authAction'
//var firebaseui = require('firebaseui');
require("firebase/firestore");
require("firebase/auth");
class Auth extends Component {
    constructor(){
        super();

        this.state = {
            email:'',
            password:''
        }
    }
    signUp=()=>{
        const {email,password}=this.state;
        console.log('signup',email,password);
        fa.createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
    }
    signIn=()=>{
        const {email,password}=this.state;
        const {save_id}=this.props;
        console.log('signin');
        fa.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
          console.log('chạy để thêm uid vô id')
          // firebase.auth().onAuthStateChanged(function(user) {
          //   if (user) {
          //     // User is signed in.
              
              
          //     var uid = user.uid;
          //     console.log('id trong signin',uid)
          //     database.collection('id').doc('iddata').set(
          //         {
          //             id:uid,
          //             display:true
          //         }
          //     )
          //     // ...
          //   } else {
          //       console.log('User is signed out')
          //     // User is signed out.
          //     // ...
          //   }
          // });  
    }
   
    render() {
        var user = fa.currentUser;
        const {email,password}=this.state;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              
              
              var uid = user.uid;
              console.log('có thằng naỳ vẫn đang sign in',uid)
              
              // ...
            } else {
              // User is signed out.
              // ...
            }
          });  

        return (
            <div className="auth">
            <label> Email </label>
            <input type="text" name="email" onChange={e =>this.setState({email:e.target.value})}></input>
            <label> Password </label>
            <input type="password" name="password" onChange={e =>this.setState({password:e.target.value})}></input>
            <button type="button" onClick={this.signUp}>Sign up</button>
            
             <Link to={'/project'}><button type="button" onClick={this.signIn}>Sign in</button></Link> 
            {/* <a href="http://localhost:3000/project"><button type="button" onClick={this.signIn}>Sign in</button></a> */}
            
            </div>
                )
    }
}

const mapStateToProps = state => ({
     
})

export default connect(mapStateToProps , { save_id })(Auth);