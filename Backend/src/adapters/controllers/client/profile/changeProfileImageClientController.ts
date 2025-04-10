import { Request, Response } from "express";
import { IchangeProfileImageClientUseCase } from "../../../../domain/interface/useCaseInterfaces/client/profile/changeProfileImageUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ChangeProfileImageClientController {
    private changeProfileImageClientUseCase: IchangeProfileImageClientUseCase
    constructor(changeProfileImageClientUseCase: IchangeProfileImageClientUseCase) {
        this.changeProfileImageClientUseCase = changeProfileImageClientUseCase
    }
    async handleUpdateProfileImageClient(req: Request, res: Response): Promise<void> {
        try {
            const { clientId, profileImage } = req.body
            const updatedProfile = await this.changeProfileImageClientUseCase.changeProfileImage(clientId, profileImage)
            res.status(HttpStatus.OK).json({ message: "Profile image uploaded", updatedProfile })
        } catch (error) {
            console.log('error while changing profie image client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while changing profie image client',
                error: error instanceof Error ? error.message : 'error while changing profie image client'
            })
        }
    }
}