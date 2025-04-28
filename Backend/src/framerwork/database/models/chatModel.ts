import { Document, model, ObjectId } from "mongoose";
import { ChatEntity } from "../../../domain/entities/chat/ChatEntity";
import { chatSchema } from "../schema/chatSchema";

export interface IchatModel extends Omit<ChatEntity, '_id'>, Document {
    _id: ObjectId
}

export const chatModel = model('chat', chatSchema)