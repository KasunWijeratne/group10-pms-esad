import { ApiHeader } from 'app/auth/utils'
import axios from 'axios'

export const GET_MATERIALS_LIST = 'GET_MATERIALS_LIST'
export const GET_MATERIALS_DATA = 'GET_MATERIALS_DATA'
export const ADD_MATERIAL = 'ADD_MATERIAL'

export const getMaterialList = () => (dispatch) => {
    axios
        .get('https://secret-garden-02617.herokuapp.com/api/materials', ApiHeader)
        .then((res) => {
            dispatch({
                type: GET_MATERIALS_LIST,
                payload: res.data.data,
            })
        })
}

export const getMaterialData = (id) => async (dispatch) => {
    await axios
        .get(
            `https://secret-garden-02617.herokuapp.com/api/materials/${id}`,
            ApiHeader
        )
        .then((res) => {
            dispatch({
                type: GET_MATERIALS_DATA,
                payload: res.data.data,
            })
        })
}

export const addMaterial = (payload) => async (dispatch) => {
    await axios
        .post(
            'https://secret-garden-02617.herokuapp.com/api/materials',
            payload,
            ApiHeader
        )
        .then((res) => {
            debugger
            dispatch({
                type: ADD_MATERIAL,
                payload: payload,
            })
        }, () => {
            dispatch({
                type: ADD_MATERIAL,
                payload: payload,
            })
        })
}