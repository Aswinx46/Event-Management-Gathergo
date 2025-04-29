import { Request, Response } from "express";
import { IloadPreviousChatUseCase } from "../../../domain/interface/useCaseInterfaces/message/loadPreviousChatUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class LoadPreviousMessageController {
    private loadPreviousMessageUseCase: IloadPreviousChatUseCase
    constructor(loadPreviousMessageUseCase: IloadPreviousChatUseCase) {
        this.loadPreviousMessageUseCase = loadPreviousMessageUseCase
    }
    async handleLoadPreviousMessage(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = req.query.pageNo as string
            const chatId = req.query.chatId as string
            if (!pageNo || !chatId) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "pageNo or chatId is nott provided" })
                return
            }
            const page = parseInt(pageNo, 10) || 1
            const { messages, hasMore } = await this.loadPreviousMessageUseCase.loadPreviousChat(chatId, page)
            res.status(HttpStatus.OK).json({ message: "Previous chat loaded", messages, hasMore })
        } catch (error) {
            console.log('error while loading previous message of chat', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while loading previous message of chat",
                error: error instanceof Error ? error.message : 'error while loading previous message of chat'
            })
        }
    }
}