import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_AUTH_BASEURL,
    withCredentials: true
})

export default instance