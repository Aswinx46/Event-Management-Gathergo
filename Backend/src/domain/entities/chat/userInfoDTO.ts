import { ObjectId } from "mongoose";

export interface UserInfo {
    _id: ObjectId | string;
    name: string;
    profileImage: string;
}