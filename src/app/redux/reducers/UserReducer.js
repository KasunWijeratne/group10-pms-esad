import { GET_USERS_LIST } from '../actions/UserActions'

const initialState = []

const UserReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS_LIST: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default UserReducer
