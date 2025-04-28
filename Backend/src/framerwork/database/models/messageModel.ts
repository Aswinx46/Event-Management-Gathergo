import { Document, model, ObjectId } from "mongoose";
import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";
import { messageSchema } from "../schema/messageSchema";

export interface ImessageModel extends Omit<MessageEntity, '_id'>, Document {
    _id: ObjectId
}

export const messageModel=model('message',messageSchema)