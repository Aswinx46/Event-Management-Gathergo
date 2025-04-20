export interface TicketBackendEntity {
    _id?: string;
    ticketId: string;
    createdAt?: Date;
    totalAmount: number;
    ticketCount: number;
    phone: string;
    email: string;
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    eventId: string;
    clientId: string;
    ticketStatus: 'used' | 'refunded' | 'unused';
    paymentTransactionId: string;
}
