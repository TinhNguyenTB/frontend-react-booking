import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    listUser: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfo: []
}
const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        // fetch gender
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            return {
                ...state,
            }
        // fetch position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }
        // fetch role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }
        // fetch all user
        case actionTypes.FETCH_LIST_USER_SUCCESS:
            state.listUser = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_LIST_USER_FAILED:
            state.listUser = []
            return {
                ...state,
            }
        // fetch all doctor
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }
        // fetch schedule time
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = []
            return {
                ...state,
            }
        // fetch allRequiredDoctorInfo
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;