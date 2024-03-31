import actionTypes from '../actions/actionTypes';

const initialState = {
    isLogin: false,
    userInfo: null,
}

const accountReducer = (state = initialState, action) => {
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

        default:
            return state;
    }
}

export default accountReducer;