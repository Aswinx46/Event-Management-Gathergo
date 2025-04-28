import { ChatEntity } from "../../../entities/chat/ChatEntity";

export interface IfindChatsBetweenClientAndVendorUseCase {
    findChatBetweenClientAndVendor(senderId: string, receiverId: string): Promise<ChatEntity | null>
}