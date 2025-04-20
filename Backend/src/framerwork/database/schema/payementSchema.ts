import { Schema } from "mongoose";
import { PaymentEntity } from "../../../domain/entities/payment/paymentEntity";

export const paymentSchema = new Schema<PaymentEntity>({
    amount: {
        type: Number,
        required: true
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'bookings'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    currency: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ['ticketBooking', 'serviceBooking']
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'vendors'
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed']
    },
    ticketId: {
        type: String,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
})