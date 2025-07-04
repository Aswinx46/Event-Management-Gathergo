import { ScheduleItem } from "./ScheduleItemType";

export interface EventType {
    _id?: string
    title: string;
    description: string;
    location: {
        type: string,
        coordinates: [number, number];
    },
    // startTime: Date;
    // endTime: Date;
    posterImage: File[] | string[] | null;
    pricePerTicket: number;
    maxTicketsPerUser: number;
    totalTicket: number;
    // date: Date[];
    createdAt: Date;
    ticketPurchased: number
    address?: string
    venueName?: string
    category: string
    hostedBy?: string
    status: "upcoming" | "completed" | "cancelled"
    schedule:ScheduleItem[]
}

