import { ObjectId } from "mongoose"

export interface VendorProfileEntityInClient {
    _id?: string | ObjectId
    title: string
    description: string
    images: string[]
    vendorId: {
        _id: ObjectId | string;
        profileImage:string
        aboutVendor:string
    }
}