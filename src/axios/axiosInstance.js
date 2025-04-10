import axios from 'axios'

const userInstance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
})

export default userInstance