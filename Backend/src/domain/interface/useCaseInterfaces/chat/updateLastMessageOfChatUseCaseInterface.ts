import { ChatEntity } from "../../../entities/chat/ChatEntity";
import { MessageEntity } from "../../../entities/chat/MessageEntity";

export interface IupdateLastMessageOfChatUseCase {
    udpateLastMessage(message: MessageEntity): Promise<ChatEntity>
}