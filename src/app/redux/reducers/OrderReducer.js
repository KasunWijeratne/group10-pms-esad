import { GET_ORDERS_LIST } from '../actions/OrderActions'

const initialState = []

const OrderReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_LIST: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default OrderReducer
