import { ChatEntityDTO } from "../../../entities/chat/ChatEntityDTO";

export interface IfindChatsOfUserUseCase {
    findChatsOfUser(userId: string,pageNo:number): Promise<{ chats: ChatEntityDTO[], hasMore: boolean }>
}