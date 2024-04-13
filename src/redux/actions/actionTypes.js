const actionTypes = Object.freeze({
    //app
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    FETCH_LIST_USER_SUCCESS: 'FETCH_LIST_USER_SUCCESS',
    FETCH_LIST_USER_FAILED: 'FETCH_LIST_USER_FAILED',

    FETCH_LIST_CLINIC_SUCCESS: 'FETCH_LIST_CLINIC_SUCCESS',
    FETCH_LIST_CLINIC_FAILED: 'FETCH_LIST_CLINIC_FAILED',

    FETCH_TOP_DOCTORS_SUCCESS: 'FETCH_TOP_DOCTORS_SUCCESS',
    FETCH_TOP_DOCTORS_FAILED: 'FETCH_TOP_DOCTORS_FAILED',

    FETCH_ALL_DOCTORS_SUCCESS: 'FETCH_ALL_DOCTORS_SUCCESS',
    FETCH_ALL_DOCTORS_FAILED: 'FETCH_ALL_DOCTORS_FAILED',

    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAILED: 'SAVE_DETAIL_DOCTOR_FAILED',

    FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALL_CODE_SCHEDULE_TIME_FAILED: 'FETCH_ALL_CODE_SCHEDULE_TIME_FAILED',

    FETCH_REQUIRED_DOCTOR_INFO_START: 'FETCH_REQUIRED_DOCTOR_INFO_START',
    FETCH_REQUIRED_DOCTOR_INFO_SUCCESS: 'FETCH_REQUIRED_DOCTOR_INFO_SUCCESS',
    FETCH_REQUIRED_DOCTOR_INFO_FAILED: 'FETCH_REQUIRED_DOCTOR_INFO_FAILED'
})

export default actionTypes;