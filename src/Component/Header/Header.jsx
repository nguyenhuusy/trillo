import React, { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { save_table, save_table_item,delete_table } from '../../redux/actions/tableAction';
import { database } from '../../Firebase';
import Todolist from '../TodoList/index';
import { Link } from 'react-router-dom';
import firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");
class Header extends Component {
    constructor() {
        super();

        this.state = {
            nameinput: '',
            descriptioninput: '',
            id: ''
        }
    }
    componentDidMount = () => {
        const { save_table, save_table_item } = this.props;

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                var uid = user.uid;
                var docRef = database.collection(uid);
                this.setState({ id: uid });
                console.log('id trong componentdidmount:', uid)
                docRef.get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc,index,arr) {
                        console.log('độ dài',doc.id.length)
                        save_table(doc.data().name_table, doc.data().description_table,doc.data().location);
                        doc.data().infor_item.forEach((item, i) => {
                            save_table_item(item.name_table_item, item.description_table_item, doc.data().location2);
                        })

                    });
                });
                // ...
            } else {
                console.log('User is signed out')
                // User is signed out.
                // ...
            }
        });


        //--------------------
        // var idRef= database.collection('id').doc('iddata')


        // console.log('đang chạy component did mount')     
        // idRef.onSnapshot((docid)=> {
        //     if (docid.exists) {


        //             var docRef = database.collection(docid.data().id);
        //         this.setState({id:docid.data().id});
        //         console.log('id trong componentdidmount:',docid.data().id)
        //         docRef.get().then(function(querySnapshot) {
        //             querySnapshot.forEach(function(doc){
        //                 save_table(doc.data().name_table,doc.data().description_table);
        //                 doc.data().infor_item.forEach((item,i)=>{
        //                     save_table_item(item.name_table_item, item.description_table_item,item.deadline_item,doc.data().location);
        //                 })

        //             });
        //         });

        //-----------------




        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // })
        // .catch(function(error) {
        //     console.log("Error getting document:", error);
        // });

    }
    savethistable = () => {
        const { nameinput, descriptioninput, id } = this.state;
        var { docid } = this.state
        const { save_table, infor } = this.props;
        // nametable.push(nameinput);
        // descriptiontable.push(descriptioninput);
        // save_description(descriptiontable);
        //save_name(nametable);
        save_table(nameinput, descriptioninput,infor.length)
        var docRef = database.collection(id).doc(`tablecontent${infor.length}`)
        docRef.set({
            'name_table': nameinput,
            'description_table': descriptioninput,
            'location': infor.length,
            
            'infor_item': []
        })


        document.getElementsByClassName("header__input-table")[0].style.display = "none";
        this.setState({ nameinput: '' });
        this.setState({ descriptioninput: '' });
        //var node = document.getElementById("table-flex");
        //node.removeAttribute("hidden");

    }
    signOut = () => {
        const {delete_table, infor} = this.props;
        console.log('signOUT')
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log('Sign-out successful.')
        }).catch(function (error) {
            // An error happened.
        });
        this.setState({ id: '' });
        for (var i=0;i< infor.length;i++) {
            console.log('i',i)
            delete_table(i);
        }
        
    }

    render() {
        const { nameinput, descriptioninput, id } = this.state;
        const { nametable, descriptiontable, infor } = this.props;
        console.log('id trong render', id);
        //--------------------

        //--------------------
        return (

            <div id="main">
                <div className="header">
                    <button onClick={() => {
                        document.getElementsByClassName("header__input-table")[0].style.display = "flex";
                    }} className="header__button"><i className="fas fa-plus"></i></button>
                    <Link to={'/'}><button type="button" onClick={this.signOut}>Sign Out</button></Link>
                    <div className="header__input-table">
                        <div className="input-body">
                            <label className="label-text" style={{ marginBottom: "5px" }}> Nhập tên bảng </label>
                            <input className="form-input form-input-table-name" type="text" name="table-name" value={nameinput} onChange={e => this.setState({ nameinput: e.target.value })} />
                            <label className="label-text" style={{ marginBottom: "5px" }}> Nhập mô tả </label>
                            <input className="form-input form-input-table-description" type="text" name="table-description" value={descriptioninput} onChange={e => this.setState({ descriptioninput: e.target.value })} />
                        </div>
                        <div>
                            <button className="table-button" onClick={this.savethistable}> Tạo bảng </button>
                            <button className="table-button" onClick={() => document.getElementsByClassName("header__input-table")[0].style.display = "none"}
                            > Huỷ </button>
                        </div>
                    </div>
                </div>

                <div id="table-flex">
                    {
                        infor.map((item, idx) =>


                            <Todolist
                                key={idx}
                                id={id}
                                index={idx}
                                name={item.name_table}
                                description={item.description_table}
                                change={value => { this.setState({ nameinput: value }) }}
                            />

                        )}
                </div>

            </div>

        )
    }
}


const mapStateToProps = state => ({
    infor: state.table.infor,
    id: state.auth.id
})
export default connect(mapStateToProps, { save_table, save_table_item, delete_table })(Header);