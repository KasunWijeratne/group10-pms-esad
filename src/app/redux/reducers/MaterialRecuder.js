import { GET_MATERIALS_LIST } from '../actions/MaterialActions'

const initialState = []

const MaterialReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_MATERIALS_LIST: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default MaterialReducer
