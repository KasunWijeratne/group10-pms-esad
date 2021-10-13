import { GET_SUPPLIERS_LIST } from '../actions/SupplierActions'

const initialState = []

const SupplierReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_SUPPLIERS_LIST: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default SupplierReducer
