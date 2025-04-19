import { ObjectId } from "mongoose";

export interface TicketEntity {
    _id: ObjectId | string
    ticketId: string;
    createdAt: Date;
    name: string;
    phone: number;
    email: string;
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    eventId: ObjectId;
    clientId: ObjectId;
    ticketStatus: 'used' | 'refunded' | 'unused'
    razorPayOrderId:string
}