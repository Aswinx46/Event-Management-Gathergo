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

    email: {
        type: String,
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    ticketCount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "successfull", "failed", "refunded"]
    },
    phone: {
        type: String,
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
    paymentTransactionId: {
        type: Schema.Types.ObjectId,
        ref: 'payment',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    checkInHistory: {
        type: [Date],
        default: []
      }

}, {
    timestamps: true
})