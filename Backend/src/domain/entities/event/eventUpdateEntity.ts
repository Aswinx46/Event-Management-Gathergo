import { ObjectId } from "mongoose";
import { ScheduleItem } from "../ScheduleType";

export interface EventUpdateEntity {
    title: string;
    description: string;
    location?: {
        longitude: number,
        latitude: number
    },

    posterImage: string[];
    pricePerTicket: number;
    maxTicketsPerUser: number;
    totalTicket: number;

    createdAt: Date;
    attendees: ObjectId[]
    ticketPurchased: number
    address?: string
    venueName?: string
    category: string
    status: "upcoming" | "completed" | "cancelled" | "onGoing" 
    schedule: ScheduleItem[]
}