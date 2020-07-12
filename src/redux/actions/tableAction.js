import {SAVE_TABLE, SAVE_TABLE_ITEM,SAVE_DEADLINE,DELETE_TABLE_ITEM,DROP_TABLE_ITEM, EDIT_TABLE_ITEM, DELETE_TABLE} from '../type';

export const save_table=(name,description,locationfordb)=> dispatch => {
    
    const data={name,description,locationfordb};
    return dispatch({
            type:SAVE_TABLE,
            payload:data
        })
    
}
export const save_table_item=(name,description,deadline,location)=>dispatch=>{
    
    const data={name,description,deadline,location};
    return dispatch({
        type: SAVE_TABLE_ITEM,
        payload:data
    })
}

export const delete_table_item=(index_main_table_delete,index_item_delete)=>dispatch=>{
    
    const data={index_main_table_delete,index_item_delete};
    return dispatch({
        type: DELETE_TABLE_ITEM,
        payload:data
    })
}
export const delete_table=(index_main_table_delete)=>dispatch=>{
    
    const data={index_main_table_delete};
    return dispatch({
        type: DELETE_TABLE,
        payload:data
    })
}
export const edit_table_item=(name,description,deadline,index_main_table,index_item)=>dispatch=>{
    
    const data={name,description,deadline,index_main_table,index_item};
    return dispatch({
        type: EDIT_TABLE_ITEM,
        payload:data
    })
}
export const drop_table_item=(old_main_table, old_item_table,new_main_table)=>dispatch=>{
    
    const data={old_main_table, old_item_table,new_main_table};
    return dispatch({
        type: DROP_TABLE_ITEM,
        payload:data
    })
}

export const save_deadline=(data) => dispatch=> {
    return dispatch({
        type: SAVE_DEADLINE,
        payload:data
    })
}
