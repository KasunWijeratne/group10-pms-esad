
export const ALERT_USER = 'ALERT_USER';

export const alertUser = (type, messege) => (dispatch) => {
    dispatch({
        type: ALERT_USER,
        payload: {
            type,
            messege,
        },
    })
}