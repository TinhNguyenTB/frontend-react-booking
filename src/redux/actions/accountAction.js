import actionTypes from "./actionTypes";
import { getUserAccount, handleLogout } from "../../services/accountService";
import { path } from "../../utils/constant";


export const doLogin = (data) => {
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
            console.log('login error:', error)
        }
    }
}

export const fetchUserAccount = () => {
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
            console.log('fetchUserAccount error:', error)
        }
    }
}

export const doLogout = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleLogout();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.PROCESS_LOGOUT
                })
                window.location.href = path.LOGIN
            }
        } catch (error) {
            console.log('logout error:', error)
        }
    }
}