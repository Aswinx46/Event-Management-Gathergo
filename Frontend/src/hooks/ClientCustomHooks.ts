import { changePasswordClient, clientCreateAccount, clientFindCategory, clientFindServiceOnCategoryBasis, clientForgetPassword, clientForgetPasswordOtpApi, clientGoogleLogin, clientLogin, clientLogout, clientResendOtp, clientSignup, clientVerifyForgetPasswordOTp, confirmBookingPayment, confirmTicketAndPayment, createBooking, createBookingPayment, createTicket, fetchBookingInClient, fetchServiceDetailsWithVendor, fetchServiceForClient, fetchVendorForCarousal, findCategoriesForCategoryListing, findEventById, findevents, findEventsBasedOnCategory, findEventsNearToUser, findTicketAndEventDetailsClient, findWalletOfClient, loadChats, loadPreviousChat, searchCategory, searchEvents, searchService, updateProfileClient } from "@/services/ApiServiceClient";
import { BookingType } from "@/types/BookingType";
import { ClientUpdateProfileEntity } from "@/types/ClientUpdateProfileType";
import { TicketEntity } from "@/types/TicketPaymentType";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
    date: Date[];
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

export const useFetchBookingsInClient = (clientId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['Bookings in client'],
        queryFn: () => fetchBookingInClient(clientId, pageNo),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}

export const useClientLogout = () => {
    return useMutation({
        mutationFn: () => clientLogout(),
    })
}
export const useFindServiceOnCategoryBasis = (categoryId: string, pageNo: number, sortBy: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['servicesOnCategoryBasis', categoryId, pageNo, sortBy],
        queryFn: () => clientFindServiceOnCategoryBasis(categoryId, pageNo, sortBy),
        enabled: options?.enabled,
        // staleTime: 5 * 60 * 1000
    })
}

export const useFindAllCategoryForListing = (pageNo: number) => {
    return useQuery({
        queryKey: ['allCategories', pageNo],
        queryFn: () => findCategoriesForCategoryListing(pageNo),
        staleTime: 5 * 60 * 1000
    })
}

export const useUpdateClientProfie = () => {
    return useMutation({
        mutationFn: (client: ClientUpdateProfileEntity) => updateProfileClient(client)
    })
}

export const useChangePasswordClient = () => {
    return useMutation({
        mutationFn: ({ userId, oldPassword, newPassword }: { userId: string, oldPassword: string, newPassword: string }) => changePasswordClient(userId, oldPassword, newPassword)
    })
}

export const useSearchCategory = () => {
    return useMutation({
        mutationFn: (query: string) => searchCategory(query)
    })
}

export const useFindEvents = (pageNo: number) => {
    return useQuery({
        queryKey: ['events', pageNo],
        queryFn: () => findevents(pageNo)
    })
}

export const useFindEventById = (eventId: string) => {
    return useQuery({
        queryKey: ['eventById', eventId],
        queryFn: () => findEventById(eventId)
    })
}

export const useCreateTicket = () => {
    return useMutation({
        mutationFn: ({ ticket, totalCount, totalAmount, paymentIntentId, vendorId }: { ticket: TicketEntity, totalCount: number, totalAmount: number, paymentIntentId: string, vendorId: string }) => createTicket(ticket, totalCount, totalAmount, paymentIntentId, vendorId)

    })
}

export const useConfirmTicketAndPayment = () => {
    return useMutation({
        mutationFn: ({ ticket, paymentIntent, vendorId }: { ticket: TicketEntity, paymentIntent: string, vendorId: string }) => confirmTicketAndPayment(ticket, paymentIntent, vendorId)
    })
}

export const useFindTicketAndEventsDetails = (clientId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['ticketAndEventDetaills', pageNo],
        queryFn: () => findTicketAndEventDetailsClient(clientId, pageNo)
    })
}

export const useFindWalletClient = (clientId: string, pageNo: number) => {
    return useQuery({
        queryKey: ['walletClient', pageNo],
        queryFn: () => findWalletOfClient(clientId, pageNo)
    })
}

export const useCreateBookingPayment = () => {
    return useMutation({
        mutationFn: ({ bookingId, paymentIntentId }: { bookingId: string, paymentIntentId: string }) => createBookingPayment(bookingId, paymentIntentId)
    })
}

export const useConfirmBookingPayment = () => {
    return useMutation({
        mutationFn: ({ booking, paymentIntentId }: { booking: BookingType, paymentIntentId: string }) => confirmBookingPayment(booking, paymentIntentId)
    })
}

export const useFindEventsBasedOnCategory = (category: string, pageNo: number, sortBy: string) => {
    return useQuery({
        queryKey: ['eventsBasedOnCategory', category, pageNo, sortBy],
        queryFn: () => findEventsBasedOnCategory(category, pageNo, sortBy),
        enabled: !!category && !!sortBy,

    })
}

export const useFindServiceUsingSearch = () => {
    return useMutation({
        mutationFn: (query: string) => searchService(query)
    })
}

export const useFindEventsOnQuery = () => {
    return useMutation({
        mutationFn: (query: string) => searchEvents(query)
    })
}

export const useFindEventsNearToUser = () => {
    return useMutation({
        mutationFn: ({ latitude, longitude, pageNo, range }: { latitude: number, longitude: number, pageNo: number, range: number }) => findEventsNearToUser(latitude, longitude, pageNo, range)
    })
}

export const useLoadMessageInfinite = (chatId: string, options?: { enabled?: boolean }) => {
    return useInfiniteQuery({
        queryKey: ['chatMessages', chatId],
        queryFn: ({ pageParam: Pageno }) => loadPreviousChat(chatId, Pageno),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {
                return allPages.length + 1
            }
            return undefined
        },
        initialPageParam: 1,
        enabled: options?.enabled
    })
}

export const useLoadChatsInfinite = (userId: string) => {
    return useInfiniteQuery({
        queryKey: ['chats', userId],
        queryFn: ({ pageParam: pageNo }) => loadChats(userId, pageNo),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {
                return allPages.length + 1
            }
            return undefined
        },
        initialPageParam: 1
    })
}