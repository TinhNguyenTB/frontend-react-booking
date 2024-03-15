import actionTypes from '../actions/actionTypes';


const initialState = {
    language: 'vi',
    topDoctors: [],
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
        default:
            return state;
    }
}

export default appReducer;