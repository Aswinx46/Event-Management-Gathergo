import { ObjectId } from "mongoose";
import { ChatEntity } from "../../../entities/chat/ChatEntity";
import { MessageEntity } from "../../../entities/chat/MessageEntity";

export interface IchatRepository {
    createChat(chat: ChatEntity): Promise<ChatEntity>
    getchatsOfUser(userId: string | ObjectId): Promise<ChatEntity[] | []>
    getChatsOfParticularUsers(senderId: string | ObjectId, receiverId: string | ObjectId): Promise<ChatEntity | null>
    updateLastMessage(message: MessageEntity): Promise<ChatEntity | null>
}