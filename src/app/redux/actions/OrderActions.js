import axios from 'axios'

export const GET_ORDERS_LIST = 'GET_ORDERS_LIST'

export const getOrdersList = () => (dispatch) => {
    axios.get('/api/order/all').then((res) => {
        dispatch({
            type: GET_ORDERS_LIST,
            payload: res.data,
        })
    })
}