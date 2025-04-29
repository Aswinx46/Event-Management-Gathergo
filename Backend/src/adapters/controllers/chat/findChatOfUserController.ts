import { Request, Response } from "express";
import { IfindChatsOfUserUseCase } from "../../../domain/interface/useCaseInterfaces/chat/findChatsOfUserUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class FindChatOfUserController {
    private findChatOfUserUseCase: IfindChatsOfUserUseCase
    constructor(findChatOfUserUseCase: IfindChatsOfUserUseCase) {
        this.findChatOfUserUseCase = findChatOfUserUseCase
    }
    async handleFindChatOfUser(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = req.query.pageNo as string
            const userId = req.query.userId as string
            const page = parseInt(pageNo, 10) || 1
            const { chats, hasMore } = await this.findChatOfUserUseCase.findChatsOfUser(userId, page)
            res.status(HttpStatus.OK).json({ message: "Chats fetched", chats, hasMore })
        } catch (error) {
            console.log('error while finding the chats of user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while finding the chats of users",
                error: error instanceof Error ? error.message : 'error while finding the chats of user'
            })
        }
    }
}