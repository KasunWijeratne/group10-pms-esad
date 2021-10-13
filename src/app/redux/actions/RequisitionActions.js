import axios from 'axios'

export const GET_REQUISITIONS_LIST = 'GET_REQUISITIONS_LIST';

export const getRequisitionsList = () => (dispatch) => {
    axios.get('/api/requisition/all').then((res) => {
        dispatch({
            type: GET_REQUISITIONS_LIST,
            payload: res.data,
        })
    })
}