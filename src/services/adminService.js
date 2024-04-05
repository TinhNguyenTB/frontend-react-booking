import axios from '../configAxios';

const getListUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

const editUserService = (user) => {
    return axios.put('/api/edit-user', user)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

export {
    getAllCodeService,
    getListUser, createNewUserService, deleteUserService, editUserService,
    getAllDoctors, getDetailInfoDoctor, saveDetailDoctorService
}