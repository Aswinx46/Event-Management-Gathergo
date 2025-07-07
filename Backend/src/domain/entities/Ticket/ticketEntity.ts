import { ObjectId } from "mongoose";



export interface TicketEntity {
    _id?: ObjectId | string
    ticketId: string;
    // createdAt?: Date;
    totalAmount: number
    ticketCount: number
    phone: string;
    email: string;
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    eventId: ObjectId | string;
    clientId: ObjectId | string;
    ticketStatus: 'used' | 'refunded' | 'unused'
    paymentTransactionId: ObjectId
    checkInHistory?: Date[]
    ticketType?: string
}
