import axios from '../configAxios';

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
}

export {
    getAllSpecialty, getDetailSpecialtyById,
    getTopDoctorHomeService, getDetailInfoDoctor, getExtraInfoDoctorById, getScheduleDoctorByDate, getProfileDoctorById,
    getAllClinic,
    getAllCodeService
}