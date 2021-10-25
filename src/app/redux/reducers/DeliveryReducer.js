import { GET_DELIVERY_LIST } from "../actions/DeliveryActions";


const initialState = []

const DeliveryReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_DELIVERY_LIST: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default DeliveryReducer;
