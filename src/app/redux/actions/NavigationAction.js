import { navigations } from "app/navigations"

export const SET_USER_NAVIGATION = 'SET_USER_NAVIGATION'

const getfilteredNavigations = (navList = [], role) => {
    return navList.reduce((array, nav) => {
        if (nav.auth) {
            if (nav.auth.includes(role)) {
                array.push(nav)
            }
        } else {
            if (nav.children) {
                nav.children = getfilteredNavigations(nav.children, role)
                array.push(nav)
            } else {
                array.push(nav)
            }
        }
        return array
    }, [])
}

const setAuthNav = (nav) => ({
    type: SET_USER_NAVIGATION,
    payload: [...nav],
})

export const getNavigationByUser = (user) => {
    return (dispatch) => {
        const filteredNavigations = getfilteredNavigations(
            navigations,
            user.role
        )

        dispatch(setAuthNav(filteredNavigations))
    }
}
