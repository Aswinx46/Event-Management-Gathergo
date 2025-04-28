import { ChatEntityDTO } from "../../domain/entities/chat/ChatEntityDTO";
import { IchatRepository } from "../../domain/interface/repositoryInterfaces/chat/chatRepositoryInterface";
import { IfindChatsOfUserUseCase } from "../../domain/interface/useCaseInterfaces/chat/findChatsOfUserUseCaseInterface";

export class FindChatsOfAUserUseCase implements IfindChatsOfUserUseCase {
    private chatDatabase: IchatRepository
    constructor(chatDatabase: IchatRepository) {
        this.chatDatabase = chatDatabase
    }
    async findChatsOfUser(userId: string, pageNo: number): Promise<{ chats: ChatEntityDTO[], hasMore: boolean }> {
        const { chats, hasMore } = await this.chatDatabase.getchatsOfUser(userId, pageNo)
        return { chats, hasMore }
    }
}