
export interface IapproveBookingVendorUseCase {
    approveBooking(bookingId: string): Promise<boolean>
}