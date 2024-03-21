import actionTypes from "./actionTypes";


export const setUserAccount = (data) => {
    return (dispatch, getState) => {
        try {
            if (data) {
                dispatch({
                    type: actionTypes.USER_LOGIN_SUCCESS,
                    userInfo: data
                })
            } else {
                dispatch({
                    type: actionTypes.USER_LOGIN_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.USER_LOGIN_FAILED,
            })
            console.log('setUserAccount error:', error)
        }
    }
}

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})