import { ObjectId } from "mongoose";
import { ServiceBookingDTO } from "./serviceBookingDTO";
import { VendorDTO } from "./vendorDTO";

export interface BookingsInClientEntity {
    _id: string | ObjectId
    date: Date
    paymentStatus: "Pending" | "Failed" | "Successfull" | "Refunded",
    vendorAproval: "Pending" | "Approved" | "Rejected",
    email: string,
    phone: number,
    status: "Pending" | "Rejected" | "Completed",
    vendor: VendorDTO,
    service: ServiceBookingDTO
}