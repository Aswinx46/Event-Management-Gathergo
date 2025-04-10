import { Request, Response } from "express";
import { IshowProfileClientUseCase } from "../../../../domain/interface/useCaseInterfaces/client/profile/showProfileClientUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ShowProfileClientController {
    private showProfileClientUseCase: IshowProfileClientUseCase
    constructor(showProfileClientUseCase: IshowProfileClientUseCase) {
        this.showProfileClientUseCase = showProfileClientUseCase
    }
    async handleShowProfileClient(req: Request, res: Response): Promise<void> {
        try {
            const { clientId } = req.params
            const client = await this.showProfileClientUseCase.showProfile(clientId)
            res.status(HttpStatus.OK).json({ message: "Client data fetched", client })
        } catch (error) {
            console.log('error while fetching profile details of client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while fetching profile details of client",
                error: error instanceof Error ? error.message : 'error while fetching profile details of client'
            })
        }
    }
}