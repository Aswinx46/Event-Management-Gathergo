import { ObjectId } from "mongoose"

export interface ClientBookingDTO {
    _id:string | ObjectId
    name:string,
    email:string,
    phone:number,
    profileImage:string
}