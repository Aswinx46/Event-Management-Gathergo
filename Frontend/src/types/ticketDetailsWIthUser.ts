import { ScheduleItem } from "./ScheduleItemType";

export interface TicketAndUserDTO {
    _id?: string
    ticketId: string;
    // createdAt?: Date;
    amount: number;
    ticketType: string
    ticketCount: number
    phone: string;
    email: string;
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    eventId: {
        _id: string
        title: string,
        description: string,
        status: "upcoming" | "completed" | "cancelled"
        address?: string,
        pricePerTicket: number;
        posterImage: string[];
        schedule: ScheduleItem[]
    }
    clientId: {
        _id: string,
        name: string
        profileImage: string
    }
    ticketStatus: 'used' | 'refunded' | 'unused'
    paymentTransactionId: string
}