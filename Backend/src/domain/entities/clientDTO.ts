import { ObjectId } from "mongoose";

export interface ClientDTO {
    _id: string | ObjectId;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
}