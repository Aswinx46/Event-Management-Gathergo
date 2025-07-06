import { Schema } from "mongoose";
import { EventEntity } from "../../../domain/entities/event/eventEntity";

export const eventSchema = new Schema<EventEntity>({
    address: {
        type: String,
        required: false
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'ticket'
    }],
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    hostedBy: {
        type: Schema.Types.ObjectId,
        ref: 'vendors'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    posterImage: [{
        type: String,
        required: true
    }],
    pricePerTicket: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        enum: ["upcoming", "completed", "cancelled", "onGoing"],
        default: "upcoming"
    },
    maxTicketsPerUser: {
        type: Number,
        required: true
    },
    totalTicketsSold: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    totalTicketCount: {
        type: Number,
        required: true
    },
    venueName: {
        type: String,
        required: false
    },
    attendeesCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    multipleTicketTypeNeeded: {
        type: Boolean,
        required: true,
    },
    schedule: [{
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    }],
    ticketTypeDescription: [{
        ticketType: { type: String, required: false },
        description: { type: String, required: false },
        price: { type: Number, required: false },
        maxCount: { type: Number, required: false },
        purchasedCount: { type: Number, required: false, default: 0 }
    }]

}, {
    timestamps: true
})

eventSchema.index({ location: '2dsphere' });
