import { ObjectId } from "mongoose";

export interface BookingPaymentEntity {
    _id?: ObjectId;
    serviceId: ObjectId;
    clientId: ObjectId;
    vendorId: ObjectId;
    date: Date[];
    email: string;
    phone: number;
    vendorApproval: "Pending" | "Approved" | "Rejected";
    paymentStatus: "Pending" | "Failed" | "Successfull" | "Refunded";
    rejectionReason?: string
    status: "Pending" | "Rejected" | "Completed" | "Cancelled"
    createdAt: Date
    isComplete: boolean
    service:{
        servicePrice:number
    }
}