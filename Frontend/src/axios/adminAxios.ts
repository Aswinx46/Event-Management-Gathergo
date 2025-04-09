import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { store } from '../store/store'
import AuthAxios from './authAxios'
import { addAdminToken } from '@/store/slices/admin/adminToken'
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ADMIN_BASEURL,
    withCredentials: true
})

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry: boolean
}

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = store.getState().adminToken.adminToken

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = await AuthAxios.post<{ newAccessToken: string }>('/refreshToken')
                const newAccessToken = refreshToken.data.newAccessToken
                store.dispatch(addAdminToken(newAccessToken))
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