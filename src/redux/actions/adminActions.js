import actionTypes from "./actionTypes";
import { getListUser } from "../../services/adminService";

export const fetchListUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getListUser("ALL");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_LIST_USER_SUCCESS,
                    data: res.users.reverse()
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_LIST_USER_FAILED
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_LIST_USER_FAILED
            });
            console.log('fetchListUser error:', error)
        }
    }
}
