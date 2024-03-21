import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.defaults.withCredentials = true; //set jwt token cookie

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    switch (status) {
        // authentication (token related issues)
        case 401: {
            return error.response.data;
        }

        // forbidden (permission related issues)
        case 403: {
            message.error(`You don't have permission to access this recource`)
            return Promise.reject(error);
        }

        // bad request
        case 400: {
            return Promise.reject(error);
        }

        // not found
        case 404: {
            return Promise.reject(error);
        }

        // conflict
        case 409: {
            return Promise.reject(error);
        }

        // unprocessable
        case 422: {
            return Promise.reject(error);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(error);
        }
    }

});

export default instance;
