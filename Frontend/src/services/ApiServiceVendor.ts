import { EventType } from '@/types/EventType';
import axios from '../axios/vendorAxios'
import clodAxios, { isAxiosError } from 'axios'
import { EventUpdateEntity } from '@/types/updateEventType';


interface VendorData {
    about?: string;
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
            throw new Error(error.response?.data?.error)
        }
        throw 'error while uploading image'
    }
}

export const vendorSignup = async (vendor: VendorData) => {
    try {
        const response = await axios.post('/signup', vendor)
        return response.data
    } catch (error) {
        console.log('error while signup vendor', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error)
        }
        throw 'error while signup Vendor'
    }
}

export const verifyOtpVendor = async ({ formdata, otpString }: { formdata: Record<string, string | number | boolean>; otpString: string }) => {
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
        const response = await axios.post('/resendOtp', { email })
        return response.data
    } catch (error) {
        console.log('error while resending otp in vendor', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while resending otp')
    }
}

export const vendorLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post('/login', { email, password })
        return response.data
    } catch (error) {
        console.log('error whilel vendor login', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while login vendor')
    }
}

export const updateProfileImageVendor = async (id: string, imageUrl: string) => {
    try {
        const response = await axios.post('/updateProfileImage', { id, imageUrl })
        return response.data
    } catch (error) {
        console.log('error while updating image vendor side', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while updating image vendor side')
    }
}


interface Service {
    _id?: string;
    serviceTitle: string;
    yearsOfExperience: number;
    serviceDescription: string;
    cancellationPolicy: string;
    termsAndCondition: string;
    serviceDuration: string;
    servicePrice: number;
    additionalHourFee: number;
    status: string;
    vendorId?: string;
    categoryId: string;
}


export const createServiceVendor = async (service: Service) => {
    try {
        const response = await axios.post('/createService', { service })
        return response.data
    } catch (error) {
        console.log('error while creating service', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while creating service')
    }
}

export const fetchCategoryCategoryForService = async () => {
    try {
        const response = await axios.get('/categories')
        return response.data
    } catch (error) {
        console.log('error while fetching category', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while fetching category for service')
    }
}

export const findServiceForVendor = async ({ vendorId, pageNo }: { vendorId: string, pageNo: number }) => {
    try {

        const response = await axios.get('/services', { params: { vendorId, pageNo } })
        return response.data
    } catch (error) {
        console.log('error while fetching service', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while fetching service')
    }
}

export const editServiceVendor = async (service: Service, serviceId: string) => {
    try {
        const response = await axios.put('/editService', { service, serviceId })
        return response.data
    } catch (error) {
        console.log('error while editing service', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while editing service')
    }
}

export const changeStatusService = async (serviceId: string) => {
    try {
        const response = await axios.patch('/changeStatusService', { serviceId })
        return response.data
    } catch (error) {
        console.log('error while changing the status of the service', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data.error)
        }
        throw new Error('error while changing the status of the service')
    }
}

export const showBookingsInVendor = async (vendorId: string, pageNo: number) => {
    try {
        const response = await axios.get(`/showBookings/${vendorId}/${pageNo}`)
        return response.data
    } catch (error) {
        console.log('error while fetching bookings in vendor side', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.message)
        throw new Error('error while fetching bookings in vendor side')
    }
}

export const approveBookingVendor = async (bookingId: string) => {
    try {
        const response = await axios.patch('/approveBooking', { bookingId })
        return response.data
    } catch (error) {
        console.log('error while approving booking in vendor side', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.message)
        throw new Error('error whilw approving booking in vendor side')
    }
}

export const rejectBooking = async (bookingId: string, rejectionReason: string) => {
    try {
        const response = await axios.patch('/rejectBooking', { bookingId, rejectionReason })
        return response.data
    } catch (error) {
        console.log('error while rejecting booking', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while rejecting booking')
    }
}

export const updateVendorDetails = async (id: string, about: string, phone: string, name: string) => {
    try {
        const response = await axios.patch('/updateDetailsVendor', { id, about, phone, name })
        return response.data
    } catch (error) {
        console.log('error while updating vendor details', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while updating vendor details')
    }
}

export const vendorLogout = async () => {
    try {
        const response = await axios.post('/logout')
        return response.data
    } catch (error) {
        console.log('error while logout', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while logout')
    }
}

export const changePasswordVendor = async (userId: string, newPassword: string, oldPassword: string) => {
    try {
        const response = await axios.patch('/changePassword', { userId, oldPassword, newPassword })
        return response.data
    } catch (error) {
        console.log('error while changing password vendor', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error whiel changing password vendor')
    }
}

export const createEvent = async (event: EventType, vendorId: string) => {
    try {
        const response = await axios.post(`/createEvent/${vendorId}`, { event })
        return response.data
    } catch (error) {
        console.log('error while creating event', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('Error whilw creating event')
    }
}

export const findAllEventsInVendor = async (vendorId: string, pageNo: number) => {
    try {
        const response = await axios.get(`/showEvents/${pageNo}/${vendorId}`)
        return response.data
    } catch (error) {
        console.log('error while fetching events in vendor side', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while fetching events in vendor side')
    }
}

export const updateEvent = async (eventId: string, update: EventUpdateEntity) => {
    try {
        const response = await axios.put('/updateEvent', { eventId, update })
        return response.data
    } catch (error) {
        console.log('error while updating event', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('Error while updating event')
    }
}

export const verifyTicket = async (ticketId: string, eventId: string) => {
    try {
        const response = await axios.post('/verifyTicket', { ticketId, eventId })
        return response.data
    } catch (error) {
        console.log('error while verifying ticket', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while verifying ticket')
    }
}

export const findWalletDetailsVendor = async (userId: string, pageNo: number) => {
    try {
        const response = await axios.get(`/walletDetails/${userId}/${pageNo}`)
        return response.data
    } catch (error) {
        console.log('error while finding the wallet details', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while finding wallet details')
    }
}

export const updateBookingAsComplete = async (bookingId: string, status: string) => {
    try {
        const response = await axios.patch('/completeBooking', { bookingId, status })
        return response.data
    } catch (error) {
        console.log('error while updating booking as complete', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while updating booking as complete')
    }
}

export const loadPreviousChatVendor = async (chatId: string, pageNo: number) => {
    try {
        const response = await axios.get('/loadPreviousChat', { params: { chatId, pageNo } })
        return response.data
    } catch (error) {
        console.log('error while loading previous chat', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while loading previous messages')
    }
}


export const loadChatsVendor = async (userId: string, pageNo: number) => {
    try {
        const response = await axios.get('/chats', { params: { userId, pageNo } })
        return response.data
    } catch (error) {
        console.log('error while finding the chats of user', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while findng the chats of user')
    }
}