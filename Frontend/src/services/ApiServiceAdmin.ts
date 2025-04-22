import { AxiosResponse, isAxiosError } from 'axios';
import axios from '../axios/adminAxios'
import { CategoryUpdate } from '@/types/CategoryUpdate';

interface Login {
    email: string;
    password: string
}

export const adminLogin = async ({ email, password }: Login) => {
    try {
        const response = await axios.post('/login', { email, password })
        return response?.data
    } catch (error) {
        console.log('error while admin login')
        if (isAxiosError(error)) {
            console.log(error)
            throw new Error(error.response?.data?.error)
        }
        throw new Error('error while admin login')
    }
}

export const fetchClientsAdmin = async (currentPage: number) => {
    try {
        const response: AxiosResponse = await axios.get('/clients', { params: { pageNo: currentPage } })
        return response.data
    } catch (error) {
        console.log('error while fetching Clients', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while fetching clients')
    }
}

export const fetchVendorsAdmin = async (currentPage: number) => {
    try {
        const response: AxiosResponse = await axios.get('/vendors', { params: { pageNo: currentPage } })
        return response.data
    } catch (error) {
        console.log('error while fetching vendors', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while fetching vendors')
    }
}

export const fetchPendingVendorsAdmin = async (currentPage: number) => {
    try {
        const response: AxiosResponse = await axios.get('/pendingVendors', { params: { pageNo: currentPage } })
        return response.data
    } catch (error) {
        console.log('error while fetching pendingVendors', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while fetching pendingVendors')
    }
}

export const approvePendingVendor = async ({ vendorId, newStatus }: { vendorId: string, newStatus: string }) => {
    try {
        const response = await axios.patch('/updateVendorStatus', { vendorId, newStatus })
        return response.data
    } catch (error) {
        console.log('error while approving pending vendor', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while approving pending vendor')
    }
}

export const rejectPendingVendor = async ({ vendorId, newStatus, rejectionReason }: { vendorId: string, newStatus: string, rejectionReason: string }) => {
    try {
        const response = await axios.patch('/rejectVendor', { vendorId, newStatus, rejectionReason })
        return response.data
    } catch (error) {
        console.log('error while rejecting vendor', error)
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error)
        }
        throw new Error('error while rejecting vendor')
    }
}

export const findAllRejectedVendor = async (currentPage: number) => {
    try {
        const response = await axios.get('/rejectedVendors', { params: { pageNo: currentPage } })
        return response.data
    } catch (error) {
        console.log('error while fetching rejected vendors', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error('error while fetching rejected vendors')
    }
}

export const findAllCategory = async (currentPage: number) => {
    try {
        const response = await axios.get('/categories', { params: { pageNo: currentPage } })
        return response.data
    } catch (error) {
        console.log('error while fetching all categories', error)
        if (error instanceof Error)
            throw new Error(error.message)
    }
}

interface Category { title: string; image: File | null; }

export const createCategory = async ({ title, image }: Category) => {
    try {
        const response = await axios.post('/createCategory', { title, image })
        return response.data
    } catch (error) {
        console.log('error while creating category', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error)
        }
        throw new Error('error while creating category')
    }
}

export const changeStatusCategory = async (categoryId: string) => {
    try {
        const response = await axios.patch('/changeStatusCategory', { categoryId })
        return response.data
    } catch (error) {
        console.log('error while changing the status of the category', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error('error while changing the status of the category')
    }
}

export const blockClient = async (clientId: string) => {
    try {
        const response = await axios.patch('/blockClient', { clientId })
        return response.data
    } catch (error) {
        console.log('error while blocking user', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while blocking user')
    }
}

export const unblockClient = async (clientId: string) => {
    try {
        const response = await axios.patch('/unblockClient', { clientId })
        return response.data
    } catch (error) {
        console.log('error while unblocking client', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while unblocking client')
    }
}

export const blockVendor = async (vendorId: string) => {
    try {
        const response = await axios.patch('/blockVendor', { vendorId })
        return response.data
    } catch (error) {
        console.log('error while blocking vendor', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while blocking vendor')
    }
}

export const unblockVendor = async (vendorId: string) => {
    try {
        const response = await axios.patch('/unblockVendor', { vendorId })
        return response.data
    } catch (error) {
        console.log('error while unblocking vendor', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while unblocking vendor')
    }
}

export const updateCategory = async (categoryId: string, updates: CategoryUpdate) => {
    try {
        const response = await axios.patch('/updateCategory', { categoryId, updates })
        return response.data
    } catch (error) {
        console.log('error while changning titlle and image of category', error)
        if (isAxiosError(error)) throw new Error(error.response?.data.error)
        throw new Error('error while changning titlle and image of category')
    }
}

export const findWalletAdmin = async (userId: string, pageNo: number) => {
    try {
        const response = await axios.get(`/wallet/${userId}/${pageNo}`)
        return response.data
    } catch (error) {
        console.log('error while finding admin wallet details', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while finding admin wallet')
    }
}