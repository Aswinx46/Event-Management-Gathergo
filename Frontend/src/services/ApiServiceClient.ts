import { isAxiosError } from 'axios';
import axios from '../axios/clientAxios'

interface Login {
    email: string;
    password: string
}

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

type Client = {
    email: string;
    googleVerified: boolean;
    name: string;
    profileImage: string
}

export const clientLogin = async ({ email, password }: Login) => {
    try {
        const response = await axios.post('/login', { email, password })
        return response?.data
    } catch (error) {
        console.log('error while client login', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error)
        }
        throw new Error('error while client login')
    }
}

export const clientSignup = async (values: FormValues) => {
    try {
        const response = await axios.post('/Signup', values)
        return response?.data
    } catch (error) {
        console.log('error while client signup', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while client signup')
    }
}

export const clientCreateAccount = async ({ formdata, otpString }: { formdata: Record<string, string | number | boolean>; otpString: string }) => {
    try {
        const response = await axios.post('/createAccount', { formdata, otpString })
        return response.data
    } catch (error) {
        console.log('error while client create account', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error)
        }
        throw new Error('error while client create account')
    }
}

export const clientResendOtp = async (email: string) => {
    try {
        const response = await axios.post('/resendOtp', { email })
        return response.data
    } catch (error) {
        console.log('error while client resend otp', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error)
        }
        throw new Error('error while client resend otp')
    }
}

export const clientGoogleLogin = async (client: Client) => {
    try {
        const response = await axios.post('/googleLogin', { client })
        return response.data
    } catch (error) {
        console.log('error while client google login', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error)
        }
        throw new Error('error while client google login')
    }
}

export const clientForgetPasswordOtpApi = async (email: string) => {
    try {
        const response = await axios.post('/sendOtpForgetPassword', { email })
        return response.data
    } catch (error) {
        console.log('error while requesting otp for forget password', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error)
        }
        throw new Error('error while requesting for otp in forget password')
    }
}

export const clientForgetPassword = async ({ email, newPassword }: { email: string, newPassword: string }) => {
    try {
        const response = await axios.post('/forgetPassword', { email, newPassword })
        return response.data
    } catch (error) {
        console.log('error while forget password', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data.error)
        }
        throw new Error('error while forget password')
    }
}

export const clientVerifyForgetPasswordOTp = async ({ email, enteredOtp }: { email: string, enteredOtp: string }) => {
    try {
        const response = await axios.post('/verifyForgetPasswwordOtp', { email, enteredOtp })
        return response.data
    } catch (error) {
        console.log('error while verifying forget password otp', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while verifying forget password otp')
    }
}

export const clientFindCategory = async () => {
    try {
        const response = await axios.get('/categories')
        return response.data
    } catch (error) {
        console.log('error while fetching category', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while fetching category')
    }
}

export const fetchVendorForCarousal = async () => {
    try {
        const response = await axios.get('/vendorsForcarousal')
        return response.data
    } catch (error) {
        console.log('error while fetching vendors for carousal', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while fetching vendor for carousal')
    }
}

export const fetchServiceForClient = async (currentPage: number) => {
    try {
        const response = await axios.get('/services', { params: { pageNo: currentPage } })
        return response.data
    } catch (error) {
        console.log('error while fetching service in client side', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while fetching services in client side')
    }
}

export interface Booking {
    date: Date;
    email: string;
    phone: number;
    name: string;
    vendorId: string,
    serviceId: string
    clientId: string
}

export const createBooking = async (booking: Booking) => {
    try {
        const response = await axios.post('/createBooking', { booking })
        return response.data
    } catch (error) {
        console.log('error while booking service', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while booking service')
    }
}

export const fetchServiceDetailsWithVendor = async (serviceId: string) => {
    try {
        const response = await axios.get(`/showClientWithVendor/${serviceId}`)
        return response.data
    } catch (error) {
        console.log('error while fetching service details with vendor', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while fetching service details with vendor')
    }
}