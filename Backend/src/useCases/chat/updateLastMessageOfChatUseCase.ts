import { ChatEntity } from "../../domain/entities/chat/ChatEntity";
import { MessageEntity } from "../../domain/entities/chat/MessageEntity";
import { IchatRepository } from "../../domain/interface/repositoryInterfaces/chat/chatRepositoryInterface";
import { IupdateLastMessageOfChatUseCase } from "../../domain/interface/useCaseInterfaces/chat/updateLastMessageOfChatUseCaseInterface";

export class UpdateLastMessageUseCase implements IupdateLastMessageOfChatUseCase {
    private chatDatabase: IchatRepository
    constructor(chatDatabase: IchatRepository) {
        this.chatDatabase = chatDatabase
    }
    async udpateLastMessage(message: MessageEntity): Promise<ChatEntity> {
        const updatedChat = await this.chatDatabase.updateLastMessage(message)
        if (!updatedChat) throw new Error("No chat found in this id for updating the last message")
        return updatedChat
    }
}