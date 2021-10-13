import { ALERT_USER } from '../actions/GlobalActions'

const initialState = {
    alert: {
        type: null,
        messege: null,
    },
}

const GlobalReducer = function (state = initialState, action) {
    switch (action.type) {
        case ALERT_USER: {
            return {
              ...state,
              alert: {...action.payload }
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default GlobalReducer
