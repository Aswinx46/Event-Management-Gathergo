import { MessageEntity } from "../../../entities/chat/MessageEntity";

export interface IloadPreviousChatUseCase {
    loadPreviousChat(chatId: string, pageNo: number): Promise<{ messages: MessageEntity[], hasMore: boolean }>
}