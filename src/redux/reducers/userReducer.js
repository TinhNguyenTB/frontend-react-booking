import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
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