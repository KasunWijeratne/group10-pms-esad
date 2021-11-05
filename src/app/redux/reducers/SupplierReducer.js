import { GET_SUPPLIERS_LIST, GET_SUPPLIER_DATA } from '../actions/SupplierActions'

const initialState = {
    list: [],
    active: {
        name: '',
        address1: '',
        address2: '',
        city: '',
        date: new Date(),
        email: '',
    },
}

const SupplierReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_SUPPLIERS_LIST: {
            return {
                ...state,
                list: [...action.payload],
            }
        }
        case GET_SUPPLIER_DATA: {
            return {
                ...state,
                active: { ...action.payload },
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default SupplierReducer
