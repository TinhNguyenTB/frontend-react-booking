export const path = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    LOG_OUT: '/logout',
    SYSTEM: '/system/*',
    DETAIL_DOCTOR: '/detail-doctor/:id',
    DETAIL_SPECIALTY: '/detail-specialty/:id',
    DETAIL_CLINIC: '/detail-clinic/:id',
    VERIFY_EMAIL_BOOKING: '/verify-booking',
    ABOUT: '/about'
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};

export const REGEX = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PHONE: /^\+?[0-9]{8,}$/
};

export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};
