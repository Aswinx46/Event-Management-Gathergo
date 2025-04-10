import { clientCreateAccount, clientFindCategory, clientFindServiceOnCategoryBasis, clientForgetPassword, clientForgetPasswordOtpApi, clientGoogleLogin, clientLogin, clientLogout, clientResendOtp, clientSignup, clientVerifyForgetPasswordOTp, createBooking, fetchBookingInClient, fetchServiceDetailsWithVendor, fetchServiceForClient, fetchVendorForCarousal } from "@/services/ApiServiceClient";
import { useMutation, useQuery } from "@tanstack/react-query";
type LoginProps = {
    email: string;
    password: string;
};

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
export const useClientLoginMutation = () => {
    return useMutation({
        mutationFn: ({ email, password }: LoginProps) => clientLogin({ email, password }),
    })
}

export const useClientSignupMutation = () => {
    return useMutation({
        mutationFn: (values: FormValues) => clientSignup(values)
    })
}

export const useCreateAccountMutation = () => {
    return useMutation({
        mutationFn: ({ formdata, otpString }: { formdata: Record<string, string | boolean | number>; otpString: string }) => clientCreateAccount({ formdata, otpString })

    })
}

export const useResendOtpClientMutation = () => {
    return useMutation({
        mutationFn: (email: string) => clientResendOtp(email)
    })
}

export const useClientGoogleLoginMutation = () => {
    return useMutation({
        mutationFn: (client: Client) => clientGoogleLogin(client)
    })
}

export const useClientRequestOtpForgetPassword = () => {
    return useMutation({
        mutationFn: (email: string) => clientForgetPasswordOtpApi(email)
    })
}

export const useClientVerifyForgetPasswordOtp = () => {
    return useMutation({
        mutationFn: ({ email, enteredOtp }: { email: string, enteredOtp: string }) => clientVerifyForgetPasswordOTp({ email, enteredOtp })
    })
}

export const useClientForgetPassword = () => {
    return useMutation({
        mutationFn: ({ email, newPassword }: { email: string, newPassword: string }) => clientForgetPassword({ email, newPassword })
    })
}

export const useFindCategoryClient = () => {
    return useQuery({
        queryKey: ['categoriesClient'],
        queryFn: clientFindCategory,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}

export const useFindVendorForCarousal = () => {
    return useQuery({
        queryKey: ['vendorForCarousal'],
        queryFn: fetchVendorForCarousal,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    })
}

export const useFindServiceForclient = (currentPage: number) => {
    return useQuery({
        queryKey: ['services', currentPage],
        queryFn: () => fetchServiceForClient(currentPage),
        // staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}

export interface Booking {
    date: Date;
    email: string;
    phone: number;
    name: string;
    vendorId: string,
    serviceId: string
    clientId: string
}

export const useCreateBooking = () => {
    return useMutation({
        mutationFn: (booking: Booking) => createBooking(booking)
    })
}

export const useFindSericeDataWithVendor = (serviceId: string) => {
    return useQuery({
        queryKey: ['serviceDataWithVendor'],
        queryFn: () => fetchServiceDetailsWithVendor(serviceId),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}

export const useFetchBookingsInClient = (clientId: string) => {
    return useQuery({
        queryKey: ['Bookings in client'],
        queryFn: () => fetchBookingInClient(clientId),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}

export const useClientLogout = () => {
    return useMutation({
        mutationFn: () => clientLogout(),
    })
}

export const useFindServiceOnCategoryBasis = (categoryId: string, pageNo: number, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['servicesOnCategoryBasis', categoryId, pageNo],
        queryFn: () => clientFindServiceOnCategoryBasis(categoryId, pageNo),
        enabled: options?.enabled,
        staleTime: 5 * 60 * 1000
    })
}