import actionTypes from '../actions/actionTypes';

const initialState = {
    language: 'vi',
    topDoctors: [],
    listClinic: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        // fetch top doctor
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = []
            return {
                ...state,
            }
        // fetch list clinic
        case actionTypes.FETCH_LIST_CLINIC_SUCCESS:
            state.listClinic = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_LIST_CLINIC_FAILED:
            state.listClinic = []
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default appReducer;