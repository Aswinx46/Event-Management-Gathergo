import { ObjectId } from "mongoose";
import { ScheduleItem } from "../ScheduleType";


export interface TicketType {
    ticketType: string
    description: string,
    price: number,
    maxCount: number,
    buyedCount: number,
    ticketLimitPerUser: number
}


export interface EventEntity {
    _id?: ObjectId;
    title: string;
    description: string;
    location: {
        type: string,
        coordinates: [number, number];
    },
    hostedBy: ObjectId | string,
    posterImage: string[];
    pricePerTicket?: number;
    maxTicketsPerUser: number;
    totalTicket: number;
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
    ticketTypeDescription?: TicketType[]
    multipleTicketTypeNeeded: boolean

}