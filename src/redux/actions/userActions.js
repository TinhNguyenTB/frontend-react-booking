import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/appService';

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_GENDER_SUCCESS,
                    genders: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_GENDER_FAILED,
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_GENDER_FAILED,
            })
            console.log('fetchGenders error:', error)
        }
    }
}

