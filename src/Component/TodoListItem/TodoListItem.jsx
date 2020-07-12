import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TodoListItem.scss';
import { connect } from 'react-redux';
import Calendar from '../Calendar/Calendar';
import { save_table_item,delete_table_item } from '../../redux/actions/tableAction';
import Edit from './Edit'
import {database} from '../../Firebase';
import firebase from "firebase";
//import $ from "jquery";
class TodoListItem extends Component {
    constructor() {
        super();
        
        this.state = {
           d:''
            
        }
    }
    nonallowDrop = (ev) => {
        ev.stopPropagation();

    }

    drag = (ev) => {
        const { index,delete_table_item,index_main_table,change } = this.props;
        ev.dataTransfer.setData("id", ev.target.id);
        ev.dataTransfer.setData("old-main-index", index_main_table);
        ev.dataTransfer.setData("old-item-index", index);
        
        //delete_table_item(index_main_table,index);
        //setTimeout(change(''),10000);

    }
    deleteitem=()=>{
        const {d}=this.state;
        const {index,index_main_table,delete_table_item,change,id, infor}=this.props;
        delete_table_item(index_main_table,index);
        var docRef = database.collection(id).doc(`tablecontent${infor[index_main_table].locationfordb}`) 
            
        docRef.get().then(function(doc){
            var deleteitem=doc.data().infor_item[index];
           
            
             docRef.update({
                
    
                'infor_item': firebase.firestore.FieldValue.arrayRemove(
                    deleteitem
                )
       })  
            
        });

        change('');
        
        
    }
        //var list=document.getElementById(`tablecontent${index_main_table}`);
        //list.removeChild(list_item);
        
    render() {
        const { index, name, description, deadline, index_main_table,change } = this.props;
        return (
            <div
            draggable="true" onDragStart={(event) => this.drag(event)}
            onDragOver={(event) => this.nonallowDrop(event)}
            
            className="draggable"
            id={`item${index_main_table}${index}`}>
                <div style={{fontWeight:"bold"}}>{name}</div>
                        <div className="table-description">
                            {description}</div>
                        {!!deadline && 
                        <div className="table-description"> 
                        Deadline: {deadline}
                        </div>}
                        <div className="main-button-item">
                        <button className="button-item" onClick={()=> document.getElementsByClassName(`table-edit-${index_main_table}${index}`)[0].style.display='block'} >Sửa task</button>
                        <button className="button-item" onClick={this.deleteitem}>Xoá task</button>
                        <div className={`table-edit table-edit-${index_main_table}${index}`}>
                <Edit
                name={name}
                description={description}
                deadline={deadline}
                index_item={index}
                index_main_table={index_main_table}
                change={change}
                />
            </div>
            
            </div>
            
            </div>
        )

    }
}


const mapStateToProps = state => ({
    
    infor:state.table.infor
})
export default connect(mapStateToProps,{delete_table_item})(TodoListItem);