import { ObjectId } from "mongoose";

export interface TransactionsEntity {
    _id?: ObjectId;
    walletId: ObjectId | string;
    currency: string;
    paymentStatus: "debit" | "credit";
    amount: number;
    date?: Date;
    paymentType: "refund" | "ticketBooking" | "top-up" | "bookingPayment" | "adminCommission"
    paymentFor: {
        resourceType: "event" | "service"
        resourceId: ObjectId;
    };
}