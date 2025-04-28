import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";
import { ImessageRepostiory } from "../../../domain/interface/repositoryInterfaces/message/messageRepositoryInterface";
import { messageModel } from "../../../framerwork/database/models/messageModel";

export class MessageRepository implements ImessageRepostiory {
    async createMessage(message: MessageEntity): Promise<MessageEntity> {
        return await messageModel.create(message)
    }
    async getMessages(senderId: string): Promise<MessageEntity[] | []> {
        return await messageModel.find({ senderId }).select('-__v -createdAt -updatedAt')
    }
    async getMessagesOfAChat(chatId: string, pageNo: number): Promise<{ messages: MessageEntity[], hasMore: boolean }> {
        const page = Math.max(pageNo, 1)
        const limit = 10
        const skip = (page - 1) * limit
        const messages = await messageModel.find({ chatId }).select('-__v -createdAt -updatedAt').sort({ sendedTime: -1 }).skip(skip).limit(limit)
        const totalMessages = await messageModel.countDocuments({ chatId })
        const hasMore = (skip + messages.length) < totalMessages
        return { messages, hasMore }
    }
}