import { GET_REQUISITIONS_LIST } from "../actions/RequisitionActions";


const initialState = []

const RequisitionReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_REQUISITIONS_LIST: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default RequisitionReducer;
