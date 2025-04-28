import { ObjectId } from "mongoose";
import { ChatEntity } from "../../domain/entities/chat/ChatEntity";
import { IchatRepository } from "../../domain/interface/repositoryInterfaces/chat/chatRepositoryInterface";
import { IcreateChatUseCase } from "../../domain/interface/useCaseInterfaces/chat/createChatUseCaseInterface";

export class CreateChatUseCase implements IcreateChatUseCase {
    private chatDatabase: IchatRepository
    constructor(chatDatabase: IchatRepository) {
        this.chatDatabase = chatDatabase
    }
    async createChat(chat: ChatEntity): Promise<ChatEntity> {
        const existingChat = await this.chatDatabase.getChatsOfParticularUsers(chat.senderId, chat.receiverId)
        if (existingChat) return existingChat
        const createdChat = await this.chatDatabase.createChat(chat)
        if (!createdChat) throw new Error('Error while creating new chat')
        return createdChat
    }
}