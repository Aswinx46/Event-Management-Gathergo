import { MessageEntity } from "../../domain/entities/chat/MessageEntity";
import { ImessageRepostiory } from "../../domain/interface/repositoryInterfaces/message/messageRepositoryInterface";
import { IloadPreviousChatUseCase } from "../../domain/interface/useCaseInterfaces/message/loadPreviousChatUseCaseInterface";

export class LoadPreviousChatUseCase implements IloadPreviousChatUseCase {
    private messageDatabase: ImessageRepostiory
    constructor(messageDatabase: ImessageRepostiory) {
        this.messageDatabase = messageDatabase
    }
    async loadPreviousChat(chatId: string, pageNo: number): Promise<{ messages: MessageEntity[]; hasMore: boolean; }> {
        return await this.messageDatabase.getMessagesOfAChat(chatId, pageNo)
    }
}