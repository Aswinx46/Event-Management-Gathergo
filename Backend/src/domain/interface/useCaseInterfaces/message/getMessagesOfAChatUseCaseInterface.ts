import { MessageEntity } from "../../../entities/chat/MessageEntity";

export interface IgetMessagesOfAChatUseCase {
    getMessages(chatId: string): Promise<MessageEntity[] | []>
}