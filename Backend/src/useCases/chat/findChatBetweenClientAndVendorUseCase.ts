import { ChatEntity } from "../../domain/entities/chat/ChatEntity";
import { IchatRepository } from "../../domain/interface/repositoryInterfaces/chat/chatRepositoryInterface";
import { IfindChatsBetweenClientAndVendorUseCase } from "../../domain/interface/useCaseInterfaces/chat/findChatBetweenClientAndVendorUseCaseInterface";

export class FindChatBetweenClientAndVendorUseCase implements IfindChatsBetweenClientAndVendorUseCase {
    private chatDatabase: IchatRepository
    constructor(chatDatabase: IchatRepository) {
        this.chatDatabase = chatDatabase
    }
    async findChatBetweenClientAndVendor(senderId: string, receiverId: string): Promise<ChatEntity | null> {
        return await this.chatDatabase.getChatsOfParticularUsers(senderId, receiverId)

    }
}