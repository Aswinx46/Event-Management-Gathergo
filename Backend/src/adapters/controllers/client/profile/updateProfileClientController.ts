import { Request, Response } from "express";
import { IupdateProfileDataUseCase } from "../../../../domain/interface/useCaseInterfaces/client/profile/updateProfileDataUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class UpdateProfileClientController {
    private UpdateProfileClientUseCase: IupdateProfileDataUseCase
    constructor(UpdateProfileClientUseCase: IupdateProfileDataUseCase) {
        this.UpdateProfileClientUseCase = UpdateProfileClientUseCase
    }
    async handleUpdateProfileClient(req: Request, res: Response): Promise<void> {
        try {
            const { client } = req.body
            const updatedProfile = await this.UpdateProfileClientUseCase.updateClientProfile(client)
            if (!updatedProfile) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "No user found in this ID" })
                return
            }
            res.status(HttpStatus.OK).json({ message: "Client data updated", updatedProfile })
        } catch (error) {
            console.log('error while update client profile', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while update client profile',
                error: error instanceof Error ? error.message : 'error while update client profile'
            })
        }
    }
}