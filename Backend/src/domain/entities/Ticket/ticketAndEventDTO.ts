import { ObjectId } from "mongoose";
import { ScheduleItem } from "../ScheduleType";

export interface TicketAndEventDTO {
    _id?: ObjectId | string
    ticketId: string; 
    amount: number
    phone: string;
    email: string;
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    ticketStatus: 'used' | 'refunded' | 'unused'
    event: {
        _id: ObjectId | string
        title: string,
        description: string,
        schedule: ScheduleItem[]
        status: "upcoming" | "completed" | "cancelled"
        address?: string,
        pricePerTicket: number;
        posterImage: string[];
    }
}