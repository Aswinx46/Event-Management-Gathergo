import { MessageEntity } from "../../domain/entities/chat/MessageEntity";
import { ImessageRepostiory } from "../../domain/interface/repositoryInterfaces/message/messageRepositoryInterface";
import { IcreateMessageUseCase } from "../../domain/interface/useCaseInterfaces/message/createMessageUseCaseInterface";

export class CreateMessageUseCase implements IcreateMessageUseCase {
    private messageDatabase: ImessageRepostiory
    constructor(messageDatabase: ImessageRepostiory) {
        this.messageDatabase = messageDatabase
    }
    async createMessage(message: MessageEntity): Promise<MessageEntity> {
        return this.messageDatabase.createMessage(message)
    }
}