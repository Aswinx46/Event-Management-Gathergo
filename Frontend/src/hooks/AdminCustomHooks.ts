import { adminLogin, approvePendingVendor, fetchClientsAdmin, fetchPendingVendorsAdmin, fetchVendorsAdmin, rejectPendingVendor } from "@/services/ApiServiceAdmin"
import { useMutation, useQuery } from "@tanstack/react-query"

interface Login {
    email: string;
    password: string
}

export const useAdminLoginMutation = () => {
    return useMutation({
        mutationFn: async ({ email, password }: Login) => {
            return await adminLogin({ email, password })
        }
    })
}

export const useFetchClientAdminQuery = (currentPage: number) => {
    return useQuery({
        queryKey: ['clients', currentPage],
        queryFn: async () => {
            return await fetchClientsAdmin(currentPage)
        }
    })
}
export const useFetchVendorAdminQuery = (currentPage: number) => {
    return useQuery({
        queryKey: ['vendors', currentPage],
        queryFn: async () => {
            return await fetchVendorsAdmin(currentPage)
        }
    })
}

export const useFetchAllPendingVendorAdminQuery = (currentPage: number) => {
    return useQuery({
        queryKey: ['pendingVendors', currentPage],
        queryFn: async () => {
            return await fetchPendingVendorsAdmin(currentPage)
        }
    })
}

export const useUpdatePendingVendorStatusAdmin = () => {
    return useMutation({
        mutationFn: async ({ vendorId, newStatus }: { vendorId: string, newStatus: string }) => {
            return await approvePendingVendor({vendorId,newStatus})
        }
    })
}

export const useRejectPendingVendor=()=>{
    return useMutation({
        mutationFn:async({ vendorId, newStatus, rejectionReason }: { vendorId: string, newStatus: string, rejectionReason: string })=>{
            return await rejectPendingVendor({vendorId,newStatus,rejectionReason})
        }
    })
}