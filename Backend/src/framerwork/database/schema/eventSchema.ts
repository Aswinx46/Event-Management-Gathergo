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
    // date: [{
    //     type: Date,
    //     required: true
    // }],
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
        required: true
    },
    // startTime: {
    //     type: Date,
    //     required: true
    // },
    // endTime: {
    //     type: Date,
    //     required: true
    // },
    status: {
        type: String,
        enum: ["upcoming", "completed", "cancelled"],
        default: "upcoming"
    },
    maxTicketsPerUser: {
        type: Number,
        required: true
    },
    ticketPurchased: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    totalTicket: {
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
    schedule: [{
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    }]

})

eventSchema.index({ location: '2dsphere' });
