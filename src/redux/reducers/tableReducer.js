import { SAVE_TABLE, SAVE_TABLE_ITEM, SAVE_DEADLINE, DELETE_TABLE_ITEM, DROP_TABLE_ITEM, EDIT_TABLE_ITEM, DELETE_TABLE } from '../type';
import { database } from '../../Firebase';
const initialState = {
    infor: [
        //    {
        //        name_table:'',
        //        discription_table:'',
        //        infor_item:[
        //            {
        //                name_table_item:'',
        //                description_table_item:''
        //            }
        //        ]
        //    }

    ],
    deadline: ''

}



export default function (state = initialState, action) {

    switch (action.type) {


        case SAVE_TABLE:
            // var docRef = database.collection("infor").doc()
            // docRef.set({
            //     name_table: action.payload.name,
            //         description_table: action.payload.description,

            //         infor_item: []
            // })
            return {
                ...state,
                infor: [...state.infor, {
                    name_table: action.payload.name,
                    description_table: action.payload.description,
                    locationfordb: action.payload.locationfordb,
                    infor_item: []

                }]


            }

        case DELETE_TABLE_ITEM:
            const d = action.payload.index_main_table_delete
            const m = action.payload.index_item_delete
            state.infor[d].infor_item.splice(m, 1)

            return {
                ...state,
                infor: state.infor
            }
        case DELETE_TABLE:

            state.infor.splice(action.payload.index_main_table_delete, 1);
            return {
                ...state,
                infor: state.infor
            }
        case EDIT_TABLE_ITEM:

            state.infor[action.payload.index_main_table].infor_item[action.payload.index_item] = {
                name_table_item: action.payload.name,
                description_table_item: action.payload.description,
                deadline_item: action.payload.deadline
            }
            return {
                ...state,
                infor: state.infor
            }
        case DROP_TABLE_ITEM:
            const a = action.payload.old_main_table
            const b = action.payload.old_item_table
            const c = action.payload.new_main_table
            state.infor[c].infor_item.push(state.infor[a].infor_item[b])
            state.infor[a].infor_item.splice(b, 1)

            return {
                ...state,
                infor: state.infor
            }
        case SAVE_TABLE_ITEM:
            const n = action.payload.location;
            state.infor[n] = {
                name_table: state.infor[n].name_table,
                description_table: state.infor[n].description_table,
                locationfordb:state.infor[n].locationfordb,
                infor_item: [...state.infor[n].infor_item,
                {
                    name_table_item: action.payload.name,
                    description_table_item: action.payload.description,
                    deadline_item: action.payload.deadline
                }
                ]

            }
            let infor = state.infor;
            return {
                ...state,
                infor: JSON.parse(JSON.stringify(infor))
                // infor_item: [...state.infor_item, {
                //     name_table_item: action.payload.name,
                //     description_table_item: action.payload.description,
                //     deadline_item:action.payload.deadline,
                //     location_item:action.payload.location
                // }]


            }
        case SAVE_DEADLINE:
            return {
                ...state,
                deadline: action.payload
            }

        default:
            return state;
    }
}
