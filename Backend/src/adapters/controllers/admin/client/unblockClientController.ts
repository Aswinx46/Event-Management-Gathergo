import { Request, Response } from "express";
import { IclientUnblockUseCase } from "../../../../domain/interface/useCaseInterfaces/client/authentication/clientUnblockUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IredisService } from "../../../../domain/interface/serviceInterface/IredisService";

export class ClientUnblockController {
    private clientUnblockUseCase: IclientUnblockUseCase
    private redisService: IredisService
    constructor(clientUnblockUseCase: IclientUnblockUseCase, redisService: IredisService) {
        this.clientUnblockUseCase = clientUnblockUseCase
        this.redisService = redisService
    }
    async handleClientUnblock(req: Request, res: Response): Promise<void> {
        try {
            const { clientId } = req.body
            await this.clientUnblockUseCase.unblockClient(clientId)
            const changeStatus = await this.redisService.set(`user:client:${clientId}`, 15 * 60, JSON.stringify('active'))
            res.status(HttpStatus.OK).json({ message: "Client Unblocked" })
        } catch (error) {
            console.log('error while unblocking client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while unblocking client",
                error: error instanceof Error ? error.message : 'error while unblocking client'
            })
        }
    }
}