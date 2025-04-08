import axios, { InternalAxiosRequestConfig } from "axios";
import { store } from '../store/store'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_VENDOR_BASEURL,
    withCredentials: true
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = store.getState().vendorToken.token
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

export default instance