import { approveBookingVendor, changePasswordVendor, changeStatusService, createEvent, createServiceVendor, editServiceVendor, fetchCategoryCategoryForService, findAllEventsInVendor, findServiceForVendor, rejectBooking, resendOtpVendor, showBookingsInVendor, updateEvent, updateProfileImageVendor, updateVendorDetails, uploadImageCloudinary, vendorLogout, vendorSignup, verifyOtpVendor } from "@/services/ApiServiceVendor";
import { EventType } from "@/types/EventType";
import { EventUpdateEntity } from "@/types/updateEventType";
import { useMutation, useQuery } from "@tanstack/react-query"

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

// export const useVendorLoginMutation = () => {
//     return useMutation({
//         mutationFn:({email,password}:{email:string,password:string})=>useLogin
//     })
// }

export const useUpdateProfileImageMutation = () => {
    return useMutation({
        mutationFn: ({ id, imageUrl }: { id: string, imageUrl: string }) => updateProfileImageVendor(id, imageUrl)
    })
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


export const useCreateServiceMutation = () => {
    return useMutation({
        mutationFn: (service: Service) => createServiceVendor(service)
    })
}

export const useFetchCategoryForServiceQuery = () => {
    return useQuery({
        queryKey: ['categories-for-addService'],
        queryFn: () => fetchCategoryCategoryForService(),

        refetchOnWindowFocus: false
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
        mutationFn: ({ event, vendorId }: { event: EventType, vendorId: string }) => createEvent(event, vendorId)
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