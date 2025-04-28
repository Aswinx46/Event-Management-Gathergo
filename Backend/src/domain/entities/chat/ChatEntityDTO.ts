import { ObjectId } from "mongoose";
import { UserInfo } from "./userInfoDTO";

export interface ChatEntityDTO {
    _id?: ObjectId;
    lastMessage: string;
    lastMessageAt: string;
    senderId: ObjectId | string | UserInfo;  // <-- can be ObjectId or populated UserInfo
    receiverId: ObjectId | string | UserInfo; // <-- same here
    senderModel: 'client' | 'vendors';
    receiverModel: 'client' | 'vendors';
}