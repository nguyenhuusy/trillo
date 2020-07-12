import {SAVE_ID} from '../type';

export const save_id=(data)=> dispatch => {
    
    
    return dispatch({
            type:SAVE_ID,
            payload:data
        })
    
}
