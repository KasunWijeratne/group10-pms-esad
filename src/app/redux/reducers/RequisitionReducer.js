import { ADD_ORDER, APPROVE_ORDER, GET_REQUISITIONS_LIST } from "../actions/RequisitionActions";


const initialState = []

const RequisitionReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_REQUISITIONS_LIST: {
            return [...action.payload]
        }
        case ADD_ORDER: {
            return [...state, action.payload]
        }
        case APPROVE_ORDER: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default RequisitionReducer;
