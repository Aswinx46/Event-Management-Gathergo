import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { store } from '../store/store'
import authAxios from './authAxios'
import { addVendorToken, removeVendorToken } from "@/store/slices/vendor/vendorTokenSlice";
import { removeVendor } from "@/store/slices/vendor/vendorSlice";
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


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean
}

interface CustomErrorResponse {
    code?: string;
    message?: string;
    // [key: string]: any;
}

instance.interceptors.response.use(
    respone => respone,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig
        const data = error.response?.data as CustomErrorResponse;

        if (error.response?.status === 403 && data?.code === "USER_BLOCKED") {
            localStorage.removeItem('vendorId')
            store.dispatch(removeVendor(null))
            store.dispatch(removeVendorToken(null))
            window.location.href = '/vendor/userBlockNotice';
            return Promise.reject(error);
        }

        if (error.response?.status === 403 && data?.code === "NOT_APPROVED") {
            window.location.href = '/vendor/userBlockNotice';
            return Promise.reject(error);
        }

        if (error.response?.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshToken = await authAxios.post<{ newAccessToken: string }>('/refreshToken')
                const newAccessToken = refreshToken.data.newAccessToken
                store.dispatch(addVendorToken(newAccessToken))

                originalRequest.headers = {
                    ...originalRequest.headers, Authorization: `Bearer ${newAccessToken}`
                }
                return instance(originalRequest)
            } catch (refreshError) {
                window.location.href = '/login';
                console.log('error while handling refresh token in the vendor side', refreshError)
                return Promise.reject(refreshError)
            }

        }
        return Promise.reject(error)
    }
)

export default instance