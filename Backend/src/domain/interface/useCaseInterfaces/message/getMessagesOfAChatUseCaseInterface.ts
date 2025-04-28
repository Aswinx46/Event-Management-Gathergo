import { MessageEntity } from "../../../entities/chat/MessageEntity";

export interface IgetMessagesOfAChatUseCase {
    getMessages(chatId: string,pageNo:number):  Promise<{ messages: MessageEntity[], hasMore: boolean }>
}