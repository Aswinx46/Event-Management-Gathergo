import { ObjectId } from "mongoose";

export interface Ticket{
    _id?:ObjectId,
    ticketId:string,
    createdAt:Date,
    name:string,
    phone:string,
    email:string,
    paymentStatus:"pending"|"successfull"|"failed",
    eventId:string | ObjectId,
    cliendId:string | ObjectId
}