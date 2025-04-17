import { Document, model, ObjectId } from "mongoose";
import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { eventSchema } from "../schema/eventSchema";

export interface IeventModal extends Omit<EventEntity, '_id'>, Document {
    _id: ObjectId
}

export const eventModal = model<EventEntity>('event', eventSchema)