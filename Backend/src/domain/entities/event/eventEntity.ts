import { ObjectId } from "mongoose";
import { ScheduleItem } from "../ScheduleType";

export interface EventEntity {
    _id?: ObjectId;
    title: string;
    description: string;
    location: {
        type: string,
        coordinates: [number, number];
    },
    hostedBy: ObjectId | string,
    // startTime: Date;
    // endTime: Date;
    posterImage: string[];
    pricePerTicket: number;
    maxTicketsPerUser: number;
    totalTicket: number;
    // date: Date[];
    createdAt: Date;
    attendees: ObjectId[]
    ticketPurchased: number
    address?: string
    venueName?: string
    category: string
    status: "upcoming" | "completed" | "cancelled" | "onGoing"
    attendeesCount: number
    isActive: boolean
    schedule: ScheduleItem[]
}