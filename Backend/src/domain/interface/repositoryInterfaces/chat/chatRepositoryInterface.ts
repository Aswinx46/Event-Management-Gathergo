import { ObjectId } from "mongoose";
import { ChatEntity } from "../../../entities/chat/ChatEntity";
import { MessageEntity } from "../../../entities/chat/MessageEntity";
import { ChatEntityDTO } from "../../../entities/chat/ChatEntityDTO";

export interface IchatRepository {
    createChat(chat: ChatEntity): Promise<ChatEntity>
    getchatsOfUser(userId: string | ObjectId, pageNo: number): Promise<{ chats: ChatEntityDTO[], hasMore: boolean }>
    getChatsOfParticularUsers(senderId: string | ObjectId, receiverId: string | ObjectId): Promise<ChatEntity | null>
    updateLastMessage(message: MessageEntity): Promise<ChatEntity | null>
    getChatId(senderId: string, receiverId: string): Promise<ChatEntity | null>
}