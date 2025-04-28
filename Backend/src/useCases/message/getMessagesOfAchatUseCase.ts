import { MessageEntity } from "../../domain/entities/chat/MessageEntity";
import { ImessageRepostiory } from "../../domain/interface/repositoryInterfaces/message/messageRepositoryInterface";
import { IgetMessagesOfAChatUseCase } from "../../domain/interface/useCaseInterfaces/message/getMessagesOfAChatUseCaseInterface";

export class GetMessagesOfAChatUseCase implements IgetMessagesOfAChatUseCase {
    private messageDatabase: ImessageRepostiory
    constructor(messageDatabase: ImessageRepostiory) {
        this.messageDatabase = messageDatabase
    }
    async getMessages(chatId: string, pageNo: number): Promise<{ messages: MessageEntity[], hasMore: boolean }> {
        const { hasMore, messages } = await this.messageDatabase.getMessagesOfAChat(chatId, pageNo)
        return { messages, hasMore }
    }
}