import { Document, model, ObjectId } from "mongoose";
import { NotificationEntity } from "../../../domain/entities/NotificationEntity";
import { notificationSchema } from "../schema/notificationSchema";
export interface InotificationSchema extends Omit<NotificationEntity, '_id'>,Document {
    _id: ObjectId
}

export const notificationModal = model('notification', notificationSchema)