import { ChatEntity } from "../../domain/entities/chat/ChatEntity";
import { IchatRepository } from "../../domain/interface/repositoryInterfaces/chat/chatRepositoryInterface";
import { IfindChatsBetweenClientAndVendor } from "../../domain/interface/useCaseInterfaces/chat/findChatBetweenClientAndVendorUseCaseInterface";

export class FindChatBetweenClientAndVendor implements IfindChatsBetweenClientAndVendor {
    private chatDatabase: IchatRepository
    constructor(chatDatabase: IchatRepository) {
        this.chatDatabase = chatDatabase
    }
    async findChatBetweenClientAndVendor(clientId: string, vendorId: string): Promise<ChatEntity> {
        const chat = await this.chatDatabase.getChatsOfParticularUsers(clientId, vendorId)
        if (!chat) throw new Error('No chat found with this users')
        return chat
    }
}