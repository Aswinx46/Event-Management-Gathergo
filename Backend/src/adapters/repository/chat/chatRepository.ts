import { ObjectId } from "mongoose";
import { ChatEntity } from "../../../domain/entities/chat/ChatEntity";
import { IchatRepository } from "../../../domain/interface/repositoryInterfaces/chat/chatRepositoryInterface";
import { chatModel } from "../../../framerwork/database/models/chatModel";
import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";

export class ChatRepository implements IchatRepository {
    async createChat(chat: ChatEntity): Promise<ChatEntity> {
        return chatModel.create(chat)
    }
    async getchatsOfUser(userId: string | ObjectId): Promise<ChatEntity[] | []> {
        return await chatModel.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        })
    }
    async getChatsOfParticularUsers(senderId: string | ObjectId, receiverId: string | ObjectId): Promise<ChatEntity | null> {
        return await chatModel.findOne({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });
    }
    async updateLastMessage(message: MessageEntity): Promise<ChatEntity | null> {
        return await chatModel.findByIdAndUpdate(message.chatId, { lastMessage: message.messageContent, lastMessageAt: message.sendedTime }, { new: true })
    }
}