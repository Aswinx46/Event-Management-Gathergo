import { Request, Response } from "express";
import { IforgetPasswordClientUseCase } from "../../../../domain/interface/useCaseInterfaces/client/authentication/forgetPasswordUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ForgetPasswordClientController {
    private forgetPasswordClientUseCase: IforgetPasswordClientUseCase
    constructor(forgetPasswordClientUseCase: IforgetPasswordClientUseCase) {
        this.forgetPasswordClientUseCase = forgetPasswordClientUseCase
    }
    async handleForgetPasswordClient(req: Request, res: Response): Promise<void> {
        try {
            const { email, newPassword, otp } = req.body
            const forgettingPassWord = await this.forgetPasswordClientUseCase.forgetPassword(email, newPassword, otp)
            if (!forgettingPassWord) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'error while forget password client' })
                return
            }
            res.status(HttpStatus.OK).json({ message: "password changed" })
        } catch (error) {
            console.log('error while forget password', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while forget password client',
                error: error instanceof Error ? error.message : 'error while forget password client'
            })
        }
    }
}