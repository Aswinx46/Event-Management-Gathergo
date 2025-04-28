import { ChatEntity } from "../../domain/entities/chat/ChatEntity";
import { IchatRepository } from "../../domain/interface/repositoryInterfaces/chat/chatRepositoryInterface";
import { IfindChatsOfUserUseCase } from "../../domain/interface/useCaseInterfaces/chat/findChatsOfUserUseCaseInterface";

export class FindChatsOfAUserUseCase implements IfindChatsOfUserUseCase {
    private chatDatabase: IchatRepository
    constructor(chatDatabase: IchatRepository) {
        this.chatDatabase = chatDatabase
    }
    async findChatsOfUser(userId: string): Promise<ChatEntity[] | []> {
        return await this.chatDatabase.getchatsOfUser(userId)
    }
}