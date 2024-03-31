import axios from '../configAxios';

const getListUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

export {
    getListUser
}