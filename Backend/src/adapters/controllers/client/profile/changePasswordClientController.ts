import { Request, Response } from "express";
import { IchangePasswordClientUseCAse } from "../../../../domain/interface/useCaseInterfaces/client/profile/changePasswordClientUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ChangePasswordClientController {
    private changePasswordCientUseCase: IchangePasswordClientUseCAse
    constructor(changePasswordCientUseCase: IchangePasswordClientUseCAse) {
        this.changePasswordCientUseCase = changePasswordCientUseCase
    }
    async handeChangePasswordClient(req: Request, res: Response): Promise<void> {
        try {
            const { userId, oldPassword, newPassword } = req.body
            console.log(userId)
            const changePasswordClient = await this.changePasswordCientUseCase.changePasswordClient(userId, oldPassword, newPassword)
            res.status(HttpStatus.OK).json({ message: "Password Changed", changePasswordClient })
        } catch (error) {
            console.log('error while changing the password of the client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while changing the password of the client',
                error: error instanceof Error ? error.message : 'error while changing the password of the client'
            })
        }
    }
}