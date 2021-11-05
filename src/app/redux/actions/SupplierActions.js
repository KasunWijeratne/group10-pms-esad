import axios from 'axios'

export const GET_SUPPLIERS_LIST = 'GET_SUPPLIERS_LIST'
export const GET_SUPPLIER_DATA = 'GET_SUPPLIER_DATA'
export const ADD_SUPPLIER = 'ADD_SUPPLIER'

export const getSuppliersList = () => (dispatch) => {
    axios.get('https://secret-garden-02617.herokuapp.com/api/suppliers').then((res) => {
        dispatch({
            type: GET_SUPPLIERS_LIST,
            payload: res.data.data,
        })
    })
}

export const getSupplierData = (id) => async (dispatch) => {
    await axios
        .get(`https://secret-garden-02617.herokuapp.com/api/suppliers/${id}`)
        .then((res) => {
            dispatch({
                type: GET_SUPPLIER_DATA,
                payload: res.data.data,
            })
        })
}

export const deleteSupplier = async (id) => {
    await axios
        .delete(`https://secret-garden-02617.herokuapp.com/api/suppliers/${id}`)
        .then((res) => {
            return true
        }, () => {
            return false;
        })
}

export const addSupplier = (payload) => async (dispatch) => {
    await axios
        .post(
            'https://secret-garden-02617.herokuapp.com/api/suppliers',
            payload
        )
        .then((res) => {
            dispatch({
                type: ADD_SUPPLIER,
                payload: res.data.data,
            })
        })
}