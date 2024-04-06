import axios from '../configAxios';

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getUserAccount = () => {
    return axios.get("/api/account")
}

const handleLogout = () => {
    return axios.post("/api/logout")
}

export {
    handleLogin, getUserAccount, handleLogout
}