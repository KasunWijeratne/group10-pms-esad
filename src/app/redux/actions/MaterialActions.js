import axios from 'axios'

export const GET_MATERIALS_LIST = 'GET_MATERIALS_LIST'

export const getMaterialList = () => (dispatch) => {
    axios.get('/api/material/all').then((res) => {
        dispatch({
            type: GET_MATERIALS_LIST,
            payload: res.data,
        })
    })
}