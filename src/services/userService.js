import axios from '../configAxios';

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

export {
    handleLogin
}