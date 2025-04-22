import { ObjectId } from "mongoose";

export interface EventEntity {
    _id?: ObjectId;
    title: string;
    description: string;
    location: {
        longitude: number,
        latitude: number
    },
    hostedBy: ObjectId | string,
    startTime: Date;
    endTime: Date;
    posterImage: string[];
    pricePerTicket: number;
    maxTicketsPerUser: number;
    totalTicket: number;
    date: Date[];
    createdAt: Date;
    attendees: ObjectId[]
    ticketPurchased: number
    address?: string
    venueName?: string
    category: string
    status: "upcoming" | "completed" | "cancelled"
    attendeesCount: number
}