import { isAxiosError } from 'axios';
import axios from '../axios/clientAxios'
import { ClientUpdateProfileEntity } from '@/types/ClientUpdateProfileType';
import { TicketEntity } from '@/types/TicketPaymentType';
import { BookingType } from '@/types/BookingType';

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
            console.log(error.response?.data?.message)
            throw new Error(error.response?.data?.message)
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
    date: Date[];
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

export const fetchBookingInClient = async (clientId: string, pageNo: number) => {
    try {
        const response = await axios.get(`/showBookings/${clientId}/${pageNo}`)
        return response.data
    } catch (error) {
        console.log('error while fetch bookings in client', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while fetching booking details in client')
    }
}

export const clientLogout = async () => {
    try {
        const response = await axios.post('/logout')
        return response.data
    } catch (error) {
        console.log('error while client logout', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while client logout')
    }
}

export const clientFindServiceOnCategoryBasis = async (categoryId: string, pageNo: number, sortBy: string) => {
    try {
        const response = await axios.get(`/servicesFiltering`, { params: { categoryId, pageNo, sortBy } })
        return response.data
    } catch (error) {
        console.log('error while fetching services on the basis of category', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while fetching services on the basis of category')
    }
}

export const findCategoriesForCategoryListing = async (pageNo: number) => {
    try {
        const response = await axios.get(`/categories/${pageNo}`)
        return response.data
    } catch (error) {
        console.log('error while fetching categories for listing', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.message)
        throw new Error('error whiel fetching categories for listing')
    }
}

export const updateProfileClient = async (client: ClientUpdateProfileEntity) => {
    try {
        const response = await axios.put('/updateProfileClient', { client })
        return response.data
    } catch (error) {
        console.log('error while udpating client profile', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while updating client profile')
    }
}

export const changePasswordClient = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        const response = await axios.patch('/changePasswordClient', { userId, oldPassword, newPassword })
        return response.data
    } catch (error) {
        console.log('error while changing password client', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while changing client password')
    }
}

export const searchCategory = async (query: string) => {
    try {
        const response = await axios.get('/searchCategory', { params: { query } })
        return response.data
    } catch (error) {
        console.log('error while searchCategory', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while search category')
    }
}

export const findevents = async (pageNo: number) => {
    try {
        const resposne = await axios.get(`/findEvents/${pageNo}`)
        return resposne.data
    } catch (error) {
        console.log('error while fetching events in client side', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while fetching events in client side')
    }
}

export const findEventById = async (eventId: string) => {
    try {
        const response = await axios.get(`/findEventById/${eventId}`)
        return response.data
    } catch (error) {
        console.log('error while finding event by id', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while finding event by id')
    }
}

export const createTicket = async (ticket: TicketEntity, totalCount: number, totalAmount: number, paymentIntentId: string, vendorId: string) => {
    try {
        const response = await axios.post('/createTicket', { ticket, totalCount, totalAmount, paymentIntentId, vendorId })
        return response.data
    } catch (error) {
        console.log('error while creating ticket', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while creating ticket')
    }

}

export const confirmTicketAndPayment = async (ticket: TicketEntity, paymentIntent: string, vendorId: string) => {
    try {
        const response = await axios.post('/confirmTicket', { ticket, paymentIntent, vendorId })
        return response.data
    } catch (error) {
        console.log('error while confirming ticket and payment', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while confirming ticket and payment')
    }
}

export const findTicketAndEventDetailsClient = async (clientId: string, pageNo: number) => {
    try {
        const response = await axios.get(`/getTicketAndEventDetails/${clientId}/${pageNo}`)
        return response.data
    } catch (error) {
        console.log('error while fetching ticketAndEventDetails', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while fetching ticketAndEvent details')
    }
}

export const findWalletOfClient = async (clientId: string, pageNo: number) => {
    try {
        const response = await axios.get(`/wallet/${clientId}/${pageNo}`)
        return response.data
    } catch (error) {
        console.log('error while finding wallet of client', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while finding wallet of client')
    }
}

export const createBookingPayment = async (bookingId: string, paymentIntentId: string) => {
    try {
        const response = await axios.post('/createBookingPayment', { bookingId, paymentIntentId })
        return response.data
    } catch (error) {
        console.log('error while inititating booking payment', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while initiating booking payment')
    }
}

export const confirmBookingPayment = async (booking: BookingType, paymentIntentId: string) => {
    try {
        const response = await axios.post('/confirmBookingPayment', { booking, paymentIntentId })
        return response.data
    } catch (error) {
        console.log('error while confirming booking payment', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while confirming booking payment')
    }
}

export const findEventsBasedOnCategory = async (category: string, pageNo: number, sortBy: string) => {
    try {
        const response = await axios.get(`/events/${category}/${pageNo}/${sortBy}`)
        return response.data
    } catch (error) {
        console.log('error while fetching events based on category', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while fetching events based on category')
    }
}

export const searchService = async (query: string) => {
    try {
        const response = await axios.get('/service/search', { params: { query } })
        return response.data
    } catch (error) {
        console.log('error while fetching service based on query', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while fetching service based on query')
    }
}