import axios from '../configAxios';

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getUserAccount = () => {
    return axios.get("/api/account")
}

export {
    handleLogin, getUserAccount
}