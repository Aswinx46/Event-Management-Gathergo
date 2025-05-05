import { ObjectId } from "mongoose";

export interface NotificationEntity {
  _id?: string;
  from: ObjectId;              // userId or system
  to: ObjectId;                // recipient userId
  message: string;           // main message
  // type: 'success' | 'info' | 'warning' | 'error';
  read: boolean;             // whether the notification was read
  // createdAt: Date;
  senderModel: 'client' | 'vendors'
  receiverModel: 'client' | 'vendors'
}
