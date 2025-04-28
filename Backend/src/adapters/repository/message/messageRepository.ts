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
    async getMessagesOfAChat(chatId: string): Promise<MessageEntity[] | []> {
        return await messageModel.find({ chatId }).select('-__v -createdAt -updatedAt')
    }
}