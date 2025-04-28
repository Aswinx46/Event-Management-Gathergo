import { ChatEntity } from "../../../entities/chat/ChatEntity";

export interface IcreateChatUseCase {
    createChat(chat: ChatEntity): Promise<ChatEntity>
}