import { ObjectId } from "mongoose";

export interface TransactionsEntity {
    _id?: ObjectId;
    walletId: ObjectId;
    currency: string;
    paymentStatus: "debit" | "credit";
    amount: number;
    date: Date;
    paymentType: "refund" | "ticketBooking" | "top-up" | "bookingPayment" | "adminCommission"
}