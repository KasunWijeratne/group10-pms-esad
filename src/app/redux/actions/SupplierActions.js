import axios from 'axios'

export const GET_SUPPLIERS_LIST = 'GET_SUPPLIERS_LIST'

export const getSuppliersList = () => (dispatch) => {
    axios.get('https://secret-garden-02617.herokuapp.com/api/suppliers').then((res) => {
        dispatch({
            type: GET_SUPPLIERS_LIST,
            payload: res.data.data,
        })
    })
}