import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    getListUser, deleteUserService, createNewUserService, editUserService,
    getAllDoctors,
    deleteClinicService, editClinicService

} from "../../services/adminService";

import { getAllSpecialty, getAllClinic } from '../../services/appService'
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

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            });
            console.log('fetchAllDoctor error:', error)
        }
    }
}

export const fetchAllClinic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_LIST_CLINIC_SUCCESS,
                    data: res.data.reverse()
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_LIST_CLINIC_FAILED
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_LIST_CLINIC_FAILED
            });
            console.log('fetch list clinic error:', error)
        }
    }
}

export const editClinic = (clinic) => {
    return async (dispatch, getState) => {
        try {
            let res = await editClinicService(clinic)
            if (res && res.errCode === 0) {
                message.success("Update clinic successfully!");
                dispatch(fetchAllClinic())
            } else {
                message.error("Update clinic failed");
            }
        } catch (error) {
            console.log('update clinic error:', error)
        }
    }
}

export const deleteClinic = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteClinicService(id)
            if (res && res.errCode === 0) {
                message.success("Delete clinic successfully!");
                dispatch(fetchAllClinic())
            } else {
                message.error("Delete clinic failed");
            }
        } catch (error) {
            console.log('delete clinic error:', error)
        }
    }
}

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
                    data: data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
            });
            console.log('fetchRequiredDoctorInfo error:', error)
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME")
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED
            });
            console.log('fetchAllScheduleTime error:', error)
        }
    }
}