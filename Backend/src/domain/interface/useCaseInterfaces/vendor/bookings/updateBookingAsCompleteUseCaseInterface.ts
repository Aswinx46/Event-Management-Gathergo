export interface IupdateBookingAsCompleteUseCase {
    changeStatusOfBooking(bookingId: string, status: string): Promise<boolean>
}