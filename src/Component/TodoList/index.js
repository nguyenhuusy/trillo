import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Todolist.scss';
import { connect } from 'react-redux';
import {database} from '../../Firebase';
import firebase from "firebase";
import Calendar from '../Calendar/Calendar';
import { save_table_item, save_table,drop_table_item,save_deadline, delete_table } from '../../redux/actions/tableAction'
import TodoListItem from '../TodoListItem/TodoListItem';
//import $ from "jquery";
class Todolist extends Component {
    constructor() {
        super();
        
        this.state = {
            nameinput: '',
            descriptioninput: '',
            state:false
        }
    }
    
    savethistable = () => {
        const { nameinput, descriptioninput } = this.state;
        const { deadline, save_table_item, index,save_deadline,id, infor } = this.props
        save_table_item(nameinput, descriptioninput, deadline, index);
        this.setState({ nameinput:'' });
        this.setState({descriptioninput:''}) 
        var docRef = database.collection(id).doc(`tablecontent${infor[index].locationfordb}`)
             docRef.update({
                 //'name_table': name,
                //'description_table': description,

                     'infor_item': firebase.firestore.FieldValue.arrayUnion({
                         'name_table_item': nameinput,
                        'description_table_item': descriptioninput,
                        'deadline_item': deadline
                     })
             })
        save_deadline('');
        document.getElementsByClassName(`table-item-input-${index}`)[0].style.display = "none";
        //document.getElementById(`tablecontent${index}`).style.display="block";
    }
    allowDrop = (ev) => {
        ev.preventDefault();

    }
    
    drop = (ev) => {
        const { nameinput, descriptioninput } = this.state;
        const {drop_table_item,index,change,deadline,id,infor}=this.props;
        ev.preventDefault();
        var data = ev.dataTransfer.getData("id");
        var a = ev.dataTransfer.getData("old-main-index");
        var b = ev.dataTransfer.getData("old-item-index");
        drop_table_item(a,b,index)
        change('');
        console.log('drop',index)
        var olddocRef = database.collection(id).doc(`tablecontent${infor[a].locationfordb}`)
        var newdocRef = database.collection(id).doc(`tablecontent${infor[index].locationfordb}`) 
        //var newitem= olddocRef.data().infor_item[b];     
        olddocRef.get().then(function(doc){
            var newitem=doc.data().infor_item[b];
            console.log('newitem',newitem)
             newdocRef.update({
    
                     'infor_item': firebase.firestore.FieldValue.arrayUnion({
                        'name_table_item': newitem.name_table_item,
                         'description_table_item': newitem.description_table_item,
                         'deadline_item': newitem.deadline_item
                 })
             })
             olddocRef.update({
                
    
                'infor_item': firebase.firestore.FieldValue.arrayRemove(
                    newitem
                )
       })  
            
        });
              

        
             
        //var a=data.substring(4,5);
        
        //ev.target.appendChild(document.getElementById(data));
        this.setState({ nameinput:'' });
    }
    deletetable=()=>{
        const {delete_table,index,change,id, infor} = this.props
        
        console.log(index)
        database.collection(id).doc(`tablecontent${infor[index].locationfordb}`).delete();
        delete_table(index);
        change('');

    }
    // componentDidMount=()=>{
    //     this.setState({nameinput:''})
    //  }
        render() {
            const { index, name, description, deadline,infor,id } = this.props;
            
            const { nameinput, descriptioninput } = this.state;
            return (
                <div className="table">
                    
                    <div className="table-header">
                        <span className="table-name">{name}</span>
                        <span className="table-description">{description}</span>
                        <button className="table-button" onClick={() => document.getElementsByClassName(`table-item-input-${index}`)[0].style.display = "flex"}>Tạo công việc</button>
                        <button className="table-button" onClick={this.deletetable}> Xoá bảng </button>
                    </div>
                    
                    

                    <div className="table-content" id={`tablecontent${index}`}
                        onDrop={(event) => this.drop(event)} onDragOver={(event) => this.allowDrop(event)}>

                        {infor[index].infor_item.map((item,idx)=>
                            
                            <TodoListItem
                            key={idx}
                            id={id}
                            index={idx}
                            index_main_table={index}
                            name={item.name_table_item}
                            description={item.description_table_item}
                            deadline={item.deadline_item}
                            change={value=>{this.setState({nameinput:value})}}
                            />
                        )}

                    </div>
                    
                    <div className={`table-item-input table-item-input-${index}`}>
                        <label style={{ marginBottom: "5px" }}> Tên công việc </label>
                        <input className="form-input form-input-table-name" type="text" name="table-name" value={nameinput} onChange={e => this.setState({ nameinput: e.target.value })} />
                        <label style={{ marginBottom: "5px" }}> Mô tả nội dung công việc </label>
                        <input className="form-input form-input-table-description" type="text" name="table-description" value={descriptioninput} onChange={e => this.setState({ descriptioninput: e.target.value })} />
                        <div className="main-button-item">
                            <button className="button-item" onClick={this.savethistable}> Lưu </button>
                            <button className="button-item" onClick={() => document.getElementsByClassName(`table-item-input-${index}`)[0].style.display = "none"}> Huỷ </button>

                            <div className="main-calendar">
                                <div className="calendar-item">
                                    <label style={{ marginBottom: "5px" }}> Deadline </label>
                                    <input className="form-input" type="text" name="deadline" value={deadline} readOnly />
                                </div>
                                <Calendar />
                            </div>

                        </div>
                    </div>
                    




                </div>
            )

        }
    }


    const mapStateToProps = state => ({
        deadline: state.table.deadline,
        infor:state.table.infor
    })
    export default connect(mapStateToProps, { save_table_item,drop_table_item,save_deadline, delete_table })(Todolist);