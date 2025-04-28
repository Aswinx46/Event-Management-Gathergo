import { MessageEntity } from "../../../entities/chat/MessageEntity";

export interface ImessageRepostiory {
    createMessage(message: MessageEntity): Promise<MessageEntity>
    getMessages(senderId: string): Promise<MessageEntity[] | []>
    getMessagesOfAChat(chatId:string):Promise<MessageEntity[] | []>
}