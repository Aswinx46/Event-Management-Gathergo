import { Schema } from "mongoose";
import { TicketEntity } from "../../../domain/entities/Ticket/ticketEntity";

export const ticketSchema = new Schema<TicketEntity>({
    ticketId: {
        type: String,
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "client",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "successfull", "failed", "refunded"]
    },
    phone: {
        type: Number,
        required: false
    },
    qrCodeLink: {
        type: String,
        required: true
    },
    ticketStatus: {
        type: String,
        enum: ['used', 'refunded', 'unused']
    },


})