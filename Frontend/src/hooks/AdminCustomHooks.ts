import { adminDashBoardDetatils, adminLogin, approvePendingVendor, blockClient, blockVendor, changeStatusCategory, createCategory, fetchClientsAdmin, fetchPendingVendorsAdmin, fetchVendorsAdmin, findAllCategory, findAllRejectedVendor, findBookingsInAdmin, findEventsInAdminSide, findWalletAdmin, rejectPendingVendor, unblockClient, unblockVendor, updateCategory } from "@/services/ApiServiceAdmin"
import { CategoryUpdate } from "@/types/CategoryUpdate";
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

export const UseChangeStatusCategory = () => {
    return useMutation({
        mutationFn: (categoryId: string) => changeStatusCategory(categoryId)
    })
}

export const useBlockClient = () => {
    return useMutation({
        mutationFn: (clientId: string) => blockClient(clientId)
    })
}

export const useUnblockClient = () => {
    return useMutation({
        mutationFn: (clientId: string) => unblockClient(clientId)
    })
}

export const useBlockVendor = () => {
    return useMutation({
        mutationFn: (vendorId: string) => blockVendor(vendorId)
    })
}

export const useUnblockVendor = () => {
    return useMutation({
        mutationFn: (vendorId: string) => unblockVendor(vendorId)
    })
}

export const useUpdateCategory = () => {
    return useMutation({
        mutationFn: ({ categoryId, updates }: { categoryId: string, updates: CategoryUpdate }) => updateCategory(categoryId, updates)
    })
}

export const useFindAdminWallet = (userId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['adminWallet', pageNo],
        queryFn: () => findWalletAdmin(userId, pageNo)
    })
}

export const useFindBookingsInAdmin = (pageNo: number) => {
    return useQuery({
        queryKey: ['bookingInAdmin', pageNo],
        queryFn: () => findBookingsInAdmin(pageNo)
    })
}

export const useFindEventsInAdmin = (pageNo: number) => {
    return useQuery({
        queryKey: ['eventsInAdmin', pageNo],
        queryFn: () => findEventsInAdminSide(pageNo)
    })
}

export const useFindAdminDashboardDetails = (adminId: string) => {
    return useQuery({
        queryKey: ['adminDashboardDetails', adminId],
        queryFn: () => adminDashBoardDetatils(adminId)
    })
}