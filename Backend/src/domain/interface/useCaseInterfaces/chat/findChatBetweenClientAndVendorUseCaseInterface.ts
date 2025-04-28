import { ChatEntity } from "../../../entities/chat/ChatEntity";

export interface IfindChatsBetweenClientAndVendor {
    findChatBetweenClientAndVendor(clientId: string, vendorId: string): Promise<ChatEntity>
}