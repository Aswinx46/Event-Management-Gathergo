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
    const response = await axios.post('/login', { email, password })
    return response?.data
}

export const clientSignup = async (values: FormValues) => {
    const response = await axios.post('/Signup', values)
    return response?.data
}

export const clientCreateAccount = async ({ formdata, otpString }: { formdata: Record<string, any>; otpString: string }) => {
    const response = await axios.post('/createAccount', { formdata, otpString })
    return response.data
}

export const clientResendOtp = async (email: string) => {
    const response = await axios.post('/resendOtp', { email })
    return response.data
}

export const clientGoogleLogin = async (client: Client) => {
    const response = await axios.post('/googleLogin', { client })
    return response.data
}