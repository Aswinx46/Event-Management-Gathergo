import { ObjectId } from "mongoose";

export interface NotificationEntity {
  _id?: string;
  from: ObjectId;             
  to: ObjectId;              
  message: string;           
  read: boolean;           
  senderModel: 'client' | 'vendors'
  receiverModel: 'client' | 'vendors'
}
