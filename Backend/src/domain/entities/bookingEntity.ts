import { ObjectId } from "mongoose";

export interface Bookings{
    _id:string | ObjectId,
    service:string | ObjectId,
    clientId:string | ObjectId,
    vendorId:string | ObjectId,
    date:Date,
    paymentStatus:"pending"|"failed" | "successfull" | "refunded"
}