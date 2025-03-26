import axios from '../axios/vendorAxios'
import clodAxios, { isAxiosError } from 'axios'

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    document: File | null;
}

interface VendorData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    idProof: string;
}
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyrx8qjpt/image/upload";

export const uploadImageCloudinary = async (formdata: FormData) => {
    try {
        const response = await clodAxios.post(CLOUDINARY_URL, formdata)
        return response.data
    } catch (error) {
        console.log('error while uploding image', error)
        if (isAxiosError(error)) {
            return error.message
        }
        return 'error while uploading image'
    }
}

export const vendorSignup = async (vendor: VendorData) => {
    try {
        const response = await axios.post('/signup', vendor)
        return response.data
    } catch (error) {
        console.log('error while signup vendor', error)
        if (isAxiosError(error)) {
            return error.message
        }
        return 'error while signup Vendor'
    }
}

export const verifyOtpVendor = async ({ formdata, otpString }: { formdata: Record<string, any>; otpString: string }) => {
    try {
        const response = await axios.post('/verify', { formdata, enteredOtp: otpString })
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "OTP verification failed"); // ✅ Throw the error
        }
        throw new Error("Unknown error occurred during OTP verification"); // ✅ Always throw an error

    }
}

export const resendOtpVendor = async (email: string) => {
    try {
        const response=await axios.post('/resendOtp',{email})
        return response.data
    } catch (error) {
        console.log('error while resending otp in vendor', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while resending otp')
    }
}