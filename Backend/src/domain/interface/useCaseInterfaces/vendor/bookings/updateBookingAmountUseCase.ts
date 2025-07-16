export interface IupdateBookingAmountUseCase {
    updateBookingAmount(bookingId: string, amount: number): Promise<boolean>
}