export interface IticketVerificationUseCase {
    verifyTicket(ticketId: string, eventId: string, vendorId: string): Promise<boolean>
}