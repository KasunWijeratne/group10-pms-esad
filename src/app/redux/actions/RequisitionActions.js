import { ApiHeader } from 'app/auth/utils';
import axios from 'axios'

export const GET_REQUISITIONS_LIST = 'GET_REQUISITIONS_LIST';
export const ADD_ORDER = 'ADD_ORDER'
export const APPROVE_ORDER = 'APPROVE_ORDER'

export const getRequisitionsList = () => (dispatch) => {
    axios.get('/api/requisition/all').then((res) => {
        dispatch({
            type: GET_REQUISITIONS_LIST,
            payload: res.data,
        })
    })
}

export const addRequisition = (payload) => async (dispatch) => {
    await axios
        .post(
            'https://secret-garden-02617.herokuapp.com/api/orders',
            payload,
            ApiHeader
        )
        .then(
            (res) => {
                debugger
                dispatch({
                    type: ADD_ORDER,
                    payload: payload,
                })
            },
            () => {
                dispatch({
                    type: ADD_ORDER,
                    payload: payload,
                })
            }
        )
}