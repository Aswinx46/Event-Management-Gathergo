import { Schema } from "mongoose";
import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";

export const transactionSchema = new Schema<TransactionsEntity>({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ["debit", "credit"]
    },
    paymentType: {
        type: String,
        enum: ["refund", "ticketBooking", "top-up", "bookingPayment", "adminCommission"]
    },

}, {
    timestamps: true
})