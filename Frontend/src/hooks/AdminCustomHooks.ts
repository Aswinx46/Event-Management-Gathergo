import { adminLogin, approvePendingVendor, createCategory, fetchClientsAdmin, fetchPendingVendorsAdmin, fetchVendorsAdmin, findAllCategory, findAllRejectedVendor, rejectPendingVendor } from "@/services/ApiServiceAdmin"
import { useMutation, useQuery } from "@tanstack/react-query"

interface Login {
    email: string;
    password: string
}

export const useAdminLoginMutation = () => {
    return useMutation({
        mutationFn: ({ email, password }: Login) => adminLogin({ email, password })

    })
}

export const useFetchClientAdminQuery = (currentPage: number) => {
    return useQuery({
        queryKey: ['clients', currentPage],
        queryFn: () => {
            return fetchClientsAdmin(currentPage)
        },
        refetchOnWindowFocus: false
    })
}
export const useFetchVendorAdminQuery = (currentPage: number) => {
    return useQuery({
        queryKey: ['vendors', currentPage],
        queryFn: () => {
            return fetchVendorsAdmin(currentPage)
        },
        refetchOnWindowFocus: false
    })
}

export const useFetchAllPendingVendorAdminQuery = (currentPage: number) => {
    return useQuery({
        queryKey: ['pendingVendors', currentPage],
        queryFn: () => {
            return fetchPendingVendorsAdmin(currentPage)
        },
        refetchOnWindowFocus: false
    })
}

export const useUpdatePendingVendorStatusAdmin = () => {
    return useMutation({
        mutationFn: ({ vendorId, newStatus }: { vendorId: string, newStatus: string }) => {
            return approvePendingVendor({ vendorId, newStatus })
        }
    })
}

// export const useRejectPendingVendor = () => {
//     return useMutation({
//         mutationFn: async ({ vendorId, newStatus, rejectionReason }: { vendorId: string, newStatus: string, rejectionReason: string }) => {
//             return await rejectPendingVendor({ vendorId, newStatus, rejectionReason })
//         },

//     })
// }

export const useRejectPendingVendor = () => {
    return useMutation({
        mutationFn: ({ vendorId, newStatus, rejectionReason }: { vendorId: string, newStatus: string, rejectionReason: string }) => rejectPendingVendor({ vendorId, newStatus, rejectionReason })
    })
}

export const useFindRejectedVendors = (currentPage: number) => {
    return useQuery({
        queryKey: ['rejectedVendors', currentPage],
        queryFn: () => {
            return findAllRejectedVendor(currentPage)
        },
        refetchOnWindowFocus: false
    })
}

export const useFindAllCategories = (currentPage: number) => {
    return useQuery({
        queryKey: ['categories', currentPage],
        queryFn: () => {
            return findAllCategory(currentPage)

        },
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000
    })
}

interface Category { title: string; image: File | null; }


export const useCreateCategory = () => {
    return useMutation({
        mutationFn: ({ title, image }: Category) => createCategory({ title, image }),
     
    })
}

