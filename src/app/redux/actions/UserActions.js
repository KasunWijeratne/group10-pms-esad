import axios from 'axios'

export const GET_USERS_LIST = 'GET_USERS_LIST'

export const getUsersList = () => (dispatch) => {
    axios.get('/api/user/all').then((res) => {
        dispatch({
            type: GET_USERS_LIST,
            payload: res.data,
        })
    })
}