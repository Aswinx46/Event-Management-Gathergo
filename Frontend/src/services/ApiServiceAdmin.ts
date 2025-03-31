import { AxiosResponse, isAxiosError } from 'axios';
import axios from '../axios/adminAxios'
import { current } from '@reduxjs/toolkit';
import { number } from 'yup';
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
        const response = await axios.get('/categories', { params: { pageNo:currentPage } })
        return response.data
    } catch (error) {
        console.log('error while fetching all categories', error)
        if (error instanceof Error)
            throw new Error(error.message)
    }
}