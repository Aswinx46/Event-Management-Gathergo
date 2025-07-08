import { ObjectId, Types } from "mongoose";

export interface TransactionsEntity {
    _id?: ObjectId;
    walletId: ObjectId | string | Types.ObjectId;
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

export interface TransactionDTO extends Omit<TransactionsEntity, 'paymentFor'> {
    resourceType: string;
    resourceDetails: {
        title: string;
        _id: string
    }
}