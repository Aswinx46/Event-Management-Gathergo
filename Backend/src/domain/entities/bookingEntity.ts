import { ObjectId } from "mongoose";

export interface BookingEntity {
    _id?: ObjectId;
    serviceId: ObjectId;
    clientId: ObjectId;
    vendorId: ObjectId;
    date: Date;
    email:string;
    phone:number;
    vendorApproval: "Pending" | "Approved" | "Rejected";
    paymentStatus: "Pending" | "Failed" | "Successfull" | "Refunded";
}