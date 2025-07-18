import { approveBookingVendor, cancelEvent, changePasswordInForgetPassword, changePasswordVendor, changeStatusService, createEvent, createServiceVendor, createWorkSamples, deleteAllNotificationsVendor, deleteSingleNotificationVendor, editServiceVendor, fetchCategoryCategoryForService, findAllEventsInVendor, findServiceForVendor, findWalletDetailsVendor, findWorkSamples, loadChatsVendor, loadPreviousChatVendor, loadVendorDashboard, otpVerificationForgetPassword, pdfDownloadVendor, rejectBooking, resendOtpVendor, sendOtpForgetPasswordVendor, showBookingsInVendor, singleNotificationReadVendor, ticketDetailsWithUser, updateBookingAsComplete, updateEvent, updateProfileImageVendor, updateVendorDetails, uploadImageCloudinary, vendorLogout, vendorSignup, verifyOtpVendor, verifyTicket } from "@/services/ApiServiceVendor";
import { Period } from "@/types/DatePeriodType";
import { EventUpdateEntity } from "@/types/updateEventType";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    idProof: string;
}

export const useUploadeImageToCloudinaryMutation = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            return await uploadImageCloudinary(formData)
        },
    })
}

export const useVendorSignupMutation = () => {
    return useMutation({
        mutationFn: async (vendor: FormValues) => {
            // const response = await vendorSignup(vendor)
            // return response.data
            return await vendorSignup(vendor)
        }
    })
}

export const useVendorVerifyOtpMutation = () => {
    return useMutation({
        mutationFn: async ({ formdata, otpString }: { formdata: Record<string, string | number | boolean>; otpString: string }) => {
            return await verifyOtpVendor({ formdata, otpString })
        }
    })
}

export const useVendorResendOtpMutation = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            return await resendOtpVendor(email)
        }
    })
}



export const useUpdateProfileImageMutation = () => {
    return useMutation({
        mutationFn: ({ id, formData }: { id: string, formData:FormData}) => updateProfileImageVendor(id, formData)
    })
}

interface Service {
    _id?: string;
    title: string;
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


export const useCreateServiceMutation = () => {
    return useMutation({
        mutationFn: (service: Service) => createServiceVendor(service)
    })
}

export const useFetchCategoryForServiceQuery = () => {
    return useQuery({
        queryKey: ['categories-for-addService'],
        queryFn: () => fetchCategoryCategoryForService(),
        refetchOnWindowFocus: false,

    },
    )
}

// export const useFetchServiceVendor = () => {
//     return useMutation({
//         mutationFn: ({ vendorId, pageNo }: { vendorId: string, pageNo: number }) => findServiceForVendor({ vendorId, pageNo })
//     })
// }

export const useFetchServiceVendor = ({ vendorId, pageNo }: { vendorId: string, pageNo: number }) => {
    return useQuery({
        queryKey: ['services-in-vendor', vendorId, pageNo],
        queryFn: () => findServiceForVendor({ vendorId, pageNo }),
        staleTime: 1000 * 60 * 5,
    })
}

export const useEditServiceVendor = () => {
    return useMutation({
        mutationFn: ({ service, serviceId }: { service: Service, serviceId: string }) => editServiceVendor(service, serviceId)
    })
}

export const useChangeStatusServiceVendor = () => {
    return useMutation({
        mutationFn: (serviceId: string) => changeStatusService(serviceId)
    })
}


export const useFetchBookingsInVendor = (vendorId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['Bookings-in-vendor', vendorId],
        queryFn: () => showBookingsInVendor(vendorId, pageNo)
    })
}

export const useApproveBooking = () => {
    return useMutation({
        mutationFn: (bookingId: string) => approveBookingVendor(bookingId)
    })
}

export const useRejectBooking = () => {
    return useMutation({
        mutationFn: ({ bookingId, rejectionReason }: { bookingId: string, rejectionReason: string }) => rejectBooking(bookingId, rejectionReason)
    })
}

export const useUpdateVendorDetailsMutation = () => {
    return useMutation({
        mutationFn: ({ id, about, phone, name }: { id: string, about: string, phone: string, name: string }) => updateVendorDetails(id, about, phone, name)
    })
}

export const useVendorLogout = () => {
    return useMutation({
        mutationFn: () => vendorLogout()
    })
}

export const useVendorChangePassword = () => {
    return useMutation({
        mutationFn: ({ userId, oldPassword, newPassword }: { userId: string, oldPassword: string, newPassword: string }) => changePasswordVendor(userId, oldPassword, newPassword)
    })
}

export const useCreateEvent = () => {
    return useMutation({
        mutationFn: (formData:FormData) => createEvent(formData)
    })
}

export const useFindAllEventsVendorSide = (vendorId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['eventsInVendor', pageNo],
        queryFn: () => findAllEventsInVendor(vendorId, pageNo)
    })
}

export const useUpdateEvent = () => {
    return useMutation({
        mutationFn: ({ eventId, update }: { eventId: string, update: EventUpdateEntity }) => updateEvent(eventId, update)
    })
}

export const useVerifyTicket = () => {
    return useMutation({
        mutationFn: ({ ticketId, eventId }: { ticketId: string, eventId: string }) => verifyTicket(ticketId, eventId)
    })
}

export const useFindWalletDetailsVendor = (userId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['walletVendor', pageNo],
        queryFn: () => findWalletDetailsVendor(userId, pageNo)
    })
}

export const useUpdateBookingAsComplete = () => {
    return useMutation({
        mutationFn: ({ bookingId, status }: { bookingId: string, status: string }) => updateBookingAsComplete(bookingId, status)
    })
}

export const useLoadMessageInfiniteVendor = (chatId: string, options?: { enabled?: boolean }) => {
    return useInfiniteQuery({
        queryKey: ['chatMessages', chatId],
        queryFn: ({ pageParam: Pageno }) => loadPreviousChatVendor(chatId, Pageno),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {
                return allPages.length + 1
            }
            return undefined
        },
        initialPageParam: 1,
        enabled: options?.enabled,
        // staleTime: 1000 * 60 * 5,
    })
}

export const useLoadChatsInfiniteVendor = (userId: string) => {
    return useInfiniteQuery({
        queryKey: ['chats', userId],
        queryFn: ({ pageParam: pageNo }) => loadChatsVendor(userId, pageNo),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {
                return allPages.length + 1
            }
            return undefined
        },
        initialPageParam: 1
    })
}

export const useVendorDashboardDetails = (vendorId: string, datePeriod: Period) => {
    return useQuery({
        queryKey: ['vendorDashboard', datePeriod],
        queryFn: () => loadVendorDashboard(vendorId, datePeriod)
    })
}

export const useTicketDetailsWithUser = (eventId: string, vendorId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['ticketDetailsWithUser', pageNo],
        queryFn: () => ticketDetailsWithUser(eventId, vendorId, pageNo)
    })
}

export const useDeleteAllNotificationsVendor = () => {
    return useMutation({
        mutationFn: (userId: string) => deleteAllNotificationsVendor(userId)
    })
}

export const useDeleteSingleNotificationsVendor = () => {
    return useMutation({
        mutationFn: (notificationId: string) => deleteSingleNotificationVendor(notificationId)
    })
}

export const useCreateWorkSample = () => {
    return useMutation({
        mutationFn: (formData:FormData) => createWorkSamples(formData)
    })
}

export const useFindWorkSamples = (vendorId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['workSamples', vendorId, pageNo],
        queryFn: () => findWorkSamples(vendorId, pageNo)
    })
}

export const useReadSingleNotificationVendor = () => {
    return useMutation({
        mutationFn: (notificationId: string) => singleNotificationReadVendor(notificationId)
    })
}

export const useSendOtpForgetPasswordVendor = () => {
    return useMutation({
        mutationFn: (email: string) => sendOtpForgetPasswordVendor(email)
    })
}

export const useOtpVerificationForgetPassword = () => {
    return useMutation({
        mutationFn: ({ email, enteredOtp }: { email: string, enteredOtp: string }) => otpVerificationForgetPassword(email, enteredOtp)
    })
}

export const useChangePasswordInForgetPassword = () => {
    return useMutation({
        mutationFn: ({ email, newPassword }: { email: string, newPassword: string }) => changePasswordInForgetPassword(email, newPassword)
    })
}

export const usePdfDownloadVendor = () => {
    return useMutation({
        mutationFn: (vendorId: string) => pdfDownloadVendor(vendorId)
    })
}

export const useCancelEvent = () => {
    return useMutation({
        mutationFn: (eventId: string) => cancelEvent(eventId)
    })
}