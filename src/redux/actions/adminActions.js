import actionTypes from "./actionTypes";
import { getUserAccount } from "../../services/adminService";

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

export const fetchUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getUserAccount();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.USER_LOGIN_SUCCESS,
                    userInfo: res.data.user
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
            console.log('fetchUser error:', error)
        }
    }
}

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})