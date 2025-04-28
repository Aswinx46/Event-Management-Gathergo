import { MessageEntity } from "../../../entities/chat/MessageEntity";

export interface IcreateMessageUseCase {
    createMessage(message: MessageEntity): Promise<MessageEntity>
}