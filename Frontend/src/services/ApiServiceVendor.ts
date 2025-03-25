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