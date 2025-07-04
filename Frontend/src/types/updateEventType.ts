import { ScheduleItem } from "./ScheduleItemType";

export interface EventUpdateEntity {
    title: string;
    description: string;
    location: {
        type: string,
        coordinates: [number, number];
    },
    posterImage: string[];
    pricePerTicket: number;
    maxTicketsPerUser: number;
    totalTicket: number;
    createdAt: Date;
    ticketPurchased: number
    address?: string
    venueName?: string
    category: string
    status: "upcoming" | "completed" | "cancelled"
    schedule: ScheduleItem[]
}