import {SAVE_ID} from '../type';
const initialState = {
    id:''

}



export default function (state = initialState, action) {

    switch (action.type) {
        

        case SAVE_ID:
            
            return {
                ...state,
                id: action.payload
            }

        

        default:
            return state;
    }
}
