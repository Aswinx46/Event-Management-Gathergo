import { ObjectId } from "mongoose"

export interface WorkSamplesEntity {
    _id?: string | ObjectId
    title: string
    description: string
    images: string[]
    vendorId:ObjectId
}