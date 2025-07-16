export interface IupdateBookingAsCompleteUseCase {
    changeStatusOfBooking(bookingId: string, status: string, amount?: number): Promise<boolean>
}