import { ObjectId } from "mongoose";

export interface VendorDTO {
    _id: string | ObjectId;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
}