import { Request, Response } from "express";
import { IclientBlockUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/clientManagement/clientBlockUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IredisService } from "../../../../domain/interface/serviceInterface/IredisService";

export class BlockClientController {
    private clientBlockUseCase: IclientBlockUseCase
    private redisService: IredisService
    constructor(clientBlockUseCase: IclientBlockUseCase, redisService: IredisService) {
        this.clientBlockUseCase = clientBlockUseCase
        this.redisService = redisService
    }
    async handleClientBlock(req: Request, res: Response): Promise<void> {
        try {
            const { clientId } = req.body
            await this.clientBlockUseCase.blockClient(clientId)
            const changeStatus = await this.redisService.set(`user:client:${clientId}`, 15 * 60, JSON.stringify('block'))
            res.status(HttpStatus.OK).json({ message: "Client Blocked" })
        } catch (error) {
            console.log('error while blocking user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while blocking user',
                error: error instanceof Error ? error.message : 'error while blocking user'
            })
        }
    }
}