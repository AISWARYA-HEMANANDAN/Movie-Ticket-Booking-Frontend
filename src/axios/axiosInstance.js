import axios from 'axios';

const userInstance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    headers: {
        "Content-Type": "application/json"
    }
});

userInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

userInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default userInstance;
