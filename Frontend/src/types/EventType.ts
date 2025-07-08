import { ScheduleItem } from "./ScheduleItemType";

export interface TicketType {
    ticketType: string
    description: string,
    price: number,
    maxCount: number,
    buyedCount?: number,
    ticketLimitPerUser: number
}

export interface EventType {
    _id?: string
    title: string;
    description: string;
    location: {
        type: string,
        coordinates: [number, number];
    },
    posterImage: File[] | string[] | null;
    pricePerTicket: number;
    maxTicketsPerUser: number;
    totalTicket: number;
    createdAt: Date;
    ticketPurchased: number
    address?: string
    venueName?: string
    category: string
    hostedBy?: string
    status: "upcoming" | "completed" | "cancelled" | "onGoing"
    schedule: ScheduleItem[]
    ticketTypeDescription?: TicketType[]
    multipleTicketTypeNeeded: boolean
}

