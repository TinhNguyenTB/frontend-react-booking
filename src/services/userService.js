import axios from '../configAxios';

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const register = (data) => {
    return axios.post('/api/register', data)
}

export {
    postPatientBookAppointment,
    postVerifyBookAppointment,
    register
}