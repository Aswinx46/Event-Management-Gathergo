import { ChatEntity } from "../../../entities/chat/ChatEntity";

export interface IfindChatsOfUserUseCase {
    findChatsOfUser(userId: string): Promise<ChatEntity[] | []>
}