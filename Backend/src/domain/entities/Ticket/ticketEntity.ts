import { ObjectId } from "mongoose";

export interface TicketEntity {
    _id?: ObjectId | string
    ticketId: string;
    createdAt?: Date;
    // name: string;
    phone: string;
    email: string;
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    eventId: ObjectId | string;
    clientId: ObjectId | string;
    ticketStatus: 'used' | 'refunded' | 'unused'
    // razorPayOrderId:string
}