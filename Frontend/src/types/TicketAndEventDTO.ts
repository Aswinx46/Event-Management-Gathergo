import { ScheduleItem } from "./ScheduleItemType";

export interface TicketAndEventDTO {
    _id?: string
    ticketId: string; totalAmount: number
    ticketCount: number
    phone: string;
    email: string;
    amount: number;
    ticketType: string
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    ticketStatus: 'used' | 'refunded' | 'unused'
    event: {
        _id: string
        title: string,
        description: string,
        status: "upcoming" | "completed" | "cancelled"
        address?: string,
        pricePerTicket: number;
        posterImage: string[];
        schedule: ScheduleItem[]
    }
}