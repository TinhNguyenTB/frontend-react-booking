import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    getListUser, deleteUserService, createNewUserService, editUserService

} from "../../services/adminService";
import { message } from "antd";


export const fetchGenders = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_GENDER_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_GENDER_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_GENDER_FAILED
            })
            console.log('fetchGender error:', error)
        }
    }
}

export const fetchRoles = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ROLE_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ROLE_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ROLE_FAILED
            })
            console.log('fetchRole error:', error)
        }
    }
}

export const fetchPositions = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_POSITION_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_POSITION_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_POSITION_FAILED
            })
            console.log('fetchPositions error:', error)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_USER_SUCCESS
                })
                dispatch(fetchListUser())
                message.success('New user created successfully!')
            } else {
                dispatch({
                    type: actionTypes.CREATE_USER_FAILED
                })
                message.error('New user created failed!')
            }
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_USER_FAILED
            })
            console.log('createNewUser error:', error)
        }
    }
}

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

export const editUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.EDIT_USER_SUCCESS
                })
                dispatch(fetchListUser())
                message.success('Edit user successful!')
            } else {
                dispatch({
                    type: actionTypes.EDIT_USER_FAILED
                })
                message.error('Edit user failed!')
            }
        } catch (error) {
            dispatch({
                type: actionTypes.EDIT_USER_FAILED
            })
            console.log('editUser error:', error)
        }
    }
}

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.DELETE_USER_SUCCESS
                })
                dispatch(fetchListUser())
                message.success('User deletion successful!')
            } else {
                dispatch({
                    type: actionTypes.DELETE_USER_FAILED
                });
                message.error('User deletion failed!')
            }
        } catch (error) {
            dispatch({
                type: actionTypes.DELETE_USER_FAILED
            });
            console.log('deleteUser error:', error)
        }
    }
}