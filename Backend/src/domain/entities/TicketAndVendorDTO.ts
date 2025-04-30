import { ObjectId } from "mongoose";

export interface TicketAndVendorDTO {
    _id?: ObjectId | string
    ticketId: string;
    // createdAt?: Date;
    totalAmount: number
    ticketCount: number
    phone: string;
    email: string;
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    eventId: {
        _id: ObjectId
        hostedBy: ObjectId
    }
    clientId: ObjectId | string;
    ticketStatus: 'used' | 'refunded' | 'unused'
    paymentTransactionId: ObjectId
}