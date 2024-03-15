import axios from '../configAxios';

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export {
    getAllSpecialty, getTopDoctorHomeService
}