import actionTypes from '../actions/actionTypes';

const initialState = {
    isLogin: false,
    userInfo: null,
    genders: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLogin: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLogin: false,
                userInfo: null
            }
        // fetch gender
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.genders;
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default userReducer;