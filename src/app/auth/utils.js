export const ApiHeader = {
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    },
}