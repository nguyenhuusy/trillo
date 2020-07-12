import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TodoListItem.scss';
import { connect } from 'react-redux';
import {database} from '../../Firebase';
import firebase from "firebase";
import Calendar from '../Calendar/Calendar';
import { save_table_item, delete_table_item, edit_table_item,save_deadline } from '../../redux/actions/tableAction'
//import $ from "jquery";
class Edit extends Component {
    constructor(props) {
        super();

        this.state = {
            name_input: props.name,
            description_input: props.description,
            deadline_input: props.deadline

        }
    }
    edittable=()=>{
        const {name_input,description_input,deadline_input}=this.state;
        const {index_item,index_main_table,edit_table_item,change,deadline_edit, save_deadline, id}=this.props;
        var docRef = database.collection(id).doc(`tablecontent${index_main_table}`)
        
        if (!!deadline_edit) {
            edit_table_item(name_input,description_input,deadline_edit,index_main_table,index_item);
            //-------------------------------------
             
            docRef.get().then(function(doc){
                var item=doc.data().infor_item[index_item];
                 docRef.update({
        
                         'infor_item': firebase.firestore.FieldValue.arrayUnion({
                            'name_table_item': name_input,
                             'description_table_item': description_input,
                             'deadline_item': deadline_edit
                     })
                 })
                 docRef.update({
                    
        
                    'infor_item': firebase.firestore.FieldValue.arrayRemove(
                        item
                    )
           })  
                
            });
                  
              //----------------------------
            this.setState({deadline_input:deadline_edit})
        } else {
            edit_table_item(name_input,description_input,deadline_input,index_main_table,index_item);
        //-------------------------------------
             
          
        docRef.get().then(function(doc){
            var item=doc.data().infor_item[index_item];
             docRef.update({
    
                     'infor_item': firebase.firestore.FieldValue.arrayUnion({
                        'name_table_item': name_input,
                         'description_table_item': description_input,
                         'deadline_item': deadline_input
                 })
             })
             docRef.update({
                
    
                'infor_item': firebase.firestore.FieldValue.arrayRemove(
                    item
                )
       })  
            
        });
          //----------------------------
        }
        save_deadline('');
        document.getElementsByClassName(`table-edit-${index_main_table}${index_item}`)[0].style.display='none'   
        change('');
    }
    render() {
        
        const {name_input,description_input,deadline_input}=this.state;
        const {index_main_table,index_item,deadline_edit}=this.props;
        return (
            <div className="table-edit-item-input" id='hehe'>
                <label className="table-item-text" style={{ marginBottom: "5px" }} > Tên công việc </label>
                <input className="form-input form-input-table-name" type="text" name="table-name" value={name_input} onChange={e => this.setState({ name_input: e.target.value })} />
                <label className="table-item-text" style={{ marginBottom: "5px" }}> Mô tả nội dung công việc </label>
                <input className="form-input form-input-table-description" type="text" name="table-description" value={description_input} onChange={e => this.setState({ description_input: e.target.value })} />
                {console.log('hehe',document.getElementById('hehe'))}
                <div className="main-button-item">
                    <button className="button-item" onClick={this.edittable}> Lưu </button>
                    <button className="button-item" onClick={()=>document.getElementsByClassName(`table-edit table-edit-${index_main_table}`)[0].style.display='none'}> Huỷ </button>
                    
                        <div style={{display:"block"}}className={`main-calendar`}>
                            <div className="calendar-item">
                                <label style={{ marginBottom: "5px" }}> Deadline </label>
                                {deadline_edit ? 
                                <input className="form-input" type="text" name="deadline" value={deadline_edit} readOnly /> : <input className="form-input" type="text" name="deadline" value={deadline_input} readOnly />
                                    }
                                </div>
                            <Calendar />
                        </div>
                    
                </div>

            </div>
        )

    }
}


const mapStateToProps = state => ({
    deadline_edit: state.table.deadline

})
export default connect(mapStateToProps, { edit_table_item, save_deadline })(Edit);