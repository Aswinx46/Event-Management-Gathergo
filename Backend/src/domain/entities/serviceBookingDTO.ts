import { ObjectId } from "mongoose"

export interface ServiceBookingDTO {
    _id: ObjectId | string
    serviceDescription: string
    servicePrice: string
    serviceTitle: string
    serviceDuration: string
}
