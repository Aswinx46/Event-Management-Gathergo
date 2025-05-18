import { ObjectId } from "mongoose";
import { ServiceEntity } from "../serviceEntity";
import { BookingEntity } from "../bookingEntity";

interface BasicUser {
    _id: ObjectId;
    name: string;
    email: string;
}

export interface BookingPdfDTO {
    _id?: ObjectId;
    serviceId: ServiceEntity
    clientId: BasicUser
    vendorId: BasicUser;
    date: Date[];
    email: string;
    phone: number;
    vendorApproval: "Pending" | "Approved" | "Rejected";
    paymentStatus: "Pending" | "Failed" | "Successfull" | "Refunded";
    rejectionReason?: string
    status: "Pending" | "Rejected" | "Completed" | "Cancelled"
    createdAt: Date
    isComplete: boolean
}


// export interface BookingWithPopulatedService extends Document, Omit<BookingEntity, "serviceId" | "clientId"> {
//     serviceId: ServiceEntity;
//     clientId: BasicUser
// }