import { ObjectId } from "mongoose";

export interface TicketAndUserDTO {
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
        _id: ObjectId | string
        title: string,
        description: string,
        date: Date[],
        startTime: Date,
        endTime: Date,
        status: "upcoming" | "completed" | "cancelled"
        address?: string,
        pricePerTicket: number;
        posterImage: string[];
    }
    clientId: {
        _id: ObjectId | string,
        name: string
        profileImage: string
    }
    ticketStatus: 'used' | 'refunded' | 'unused'
    paymentTransactionId: ObjectId
}