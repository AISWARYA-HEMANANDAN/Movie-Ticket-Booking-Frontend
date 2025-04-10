import userInstance from "../axios/axiosInstance"

export const userSignup = (data) => {
    return userInstance.post("/user/register", data)
}

export const userLogin = (data) => {
    return userInstance.post("/user/login", data)
}