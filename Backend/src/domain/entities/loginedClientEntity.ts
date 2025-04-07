import { ObjectId } from "mongoose";

export interface LoginedClient {
    clientId: string,
    email: string,
    name: string,
    phone: number,
    profileImage?: string,
    _id?: ObjectId
    role: string,
    status: string
}