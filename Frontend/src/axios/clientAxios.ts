import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { store } from '../store/store'
import { addToken } from '@/store/slices/user/userTokenSlice';
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    withCredentials: true
});

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = store.getState().token.token
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    }
)

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}


instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig

        if (error.response?.status === 423) {
            window.location.href = '/userBlockNotice';
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await instance.post<{ accessToken: string }>(
                    '/refreshToken',
                    {},
                    { withCredentials: true }
                );
                const newAccessToken = refreshResponse.data.accessToken;

                store.dispatch(addToken(newAccessToken));
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                };

                return instance(originalRequest);

            } catch (refreshError) {
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

    }
)

export default instance