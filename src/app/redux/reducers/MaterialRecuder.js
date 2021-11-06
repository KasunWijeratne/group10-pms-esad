import { ADD_MATERIAL, GET_MATERIALS_DATA, GET_MATERIALS_LIST } from '../actions/MaterialActions'

export const initialState = {
    list: [],
    active: {
        name: '',
        suppliers: [],
        date: new Date(),
    },
}

const MaterialReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_MATERIALS_LIST: {
            return {
                ...state,
                list: [...action.payload]
            }
        }        
        case GET_MATERIALS_DATA: {
            return {
                ...state,
                active: {...action.payload},
            }
        }       
        case ADD_MATERIAL: {
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: state.list.length + 1,
                        name: action.payload.name,
                        unit: '1kg',
                        unit_price: '2472.81',
                    },
                ],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default MaterialReducer
