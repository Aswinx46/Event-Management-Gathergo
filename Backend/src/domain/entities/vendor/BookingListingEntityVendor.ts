import { ObjectId } from "mongoose"
import { ClientDTO } from "../clientDTO"
import { ServiceBookingDTO } from "../serviceBookingDTO"

export interface BookingListingEntityVendor {
    _id: string | ObjectId
    date: Date
    paymentStatus: "Pending" | "Failed" | "Successfull" | "Refunded",
    vendorAproval: "Pending" | "Approved" | "Rejected",
    email: string,
    phone: number,
    status: "Pending" | "Rejected" | "Completed",
    client: ClientDTO,
    service: ServiceBookingDTO
}