import axios from '../configAxios';

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}

export {
    getAllSpecialty
}