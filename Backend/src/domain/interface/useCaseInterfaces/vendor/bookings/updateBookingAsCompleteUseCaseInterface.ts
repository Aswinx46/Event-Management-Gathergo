export interface IupdateBookingAsCompleteUseCase {
    changeStatusOfBooking(bookingId: string, status: string, servicePrice: number, amount?: number, extraHour?: number): Promise<boolean>
}