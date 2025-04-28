import { ObjectId } from "mongoose";
import { ChatEntity } from "../../../domain/entities/chat/ChatEntity";
import { IchatRepository } from "../../../domain/interface/repositoryInterfaces/chat/chatRepositoryInterface";
import { chatModel } from "../../../framerwork/database/models/chatModel";
import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";
import { ChatEntityDTO } from "../../../domain/entities/chat/ChatEntityDTO";

export class ChatRepository implements IchatRepository {
    async createChat(chat: ChatEntity): Promise<ChatEntity> {
        return chatModel.create(chat)
    }
    // async getchatsOfUser(userId: string | ObjectId): Promise<ChatEntity[] | []> {
    //     return await chatModel.find({
    //         $or: [
    //             { senderId: userId },
    //             { receiverId: userId }
    //         ]
    //     })
    // }
    async getchatsOfUser(userId: string | ObjectId, pageNo: number): Promise<{ chats: ChatEntityDTO[], hasMore: boolean }> {
        const limit = 10
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const chats = await chatModel.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        }).sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('senderId', 'name profileImage') // populate senderId with only name and profileImage fields
            .populate('receiverId', 'name profileImage') // populate receiverId similarly

        const totalChats = await chatModel.countDocuments({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        });

        const hasMore = (skip + chats.length) < totalChats;
        return { chats, hasMore };

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