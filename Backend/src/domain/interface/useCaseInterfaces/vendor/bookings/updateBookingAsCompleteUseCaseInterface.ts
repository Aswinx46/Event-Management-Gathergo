export interface IupdateBookingAsCompleteUseCase {
    changeStatusOfBooking(bookingId: string, status: string, amount?: number, extraHour?: number): Promise<boolean>
}