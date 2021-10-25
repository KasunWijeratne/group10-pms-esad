import axios from 'axios'

export const GET_DELIVERY_LIST = 'GET_DELIVERY_LIST'

export const getDeliveryList = () => (dispatch) => {
    axios.get('/api/delivery/all').then((res) => {
        dispatch({
            type: GET_DELIVERY_LIST,
            payload: res.data,
        })
    })
}