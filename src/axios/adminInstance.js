import axios from 'axios';

const adminInstance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    headers: {
        "Content-Type": "application/json",
    },
});

adminInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("admin-token"); // fixed key for admin
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

adminInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("admin-token");
            window.location.href = "/admin-login"; // match your actual admin login route
        }
        return Promise.reject(error);
    }
);

export default adminInstance;
