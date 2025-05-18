import { Request, Response } from "express";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IforgetPasswordVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/forgetPasswordUseCaseInterface";

export class ForgetPasswordChangeVendorController {
    private forgetPasswordChangeVendorUseCase: IforgetPasswordVendorUseCase
    constructor(forgetPasswordChangeVendorUseCase: IforgetPasswordVendorUseCase) {
        this.forgetPasswordChangeVendorUseCase = forgetPasswordChangeVendorUseCase
    }
    async handleForgetPasswordChange(req: Request, res: Response): Promise<void> {
        try {
            const { email, newPassword } = req.body
            await this.forgetPasswordChangeVendorUseCase.forgetPassword(email, newPassword)
            res.status(HttpStatus.OK).json({ message: "Password changed" })
        } catch (error) {
            console.log('error while changing the password of vendor in forget password', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while changing the password of vendor in forget password",
                error: error instanceof Error ? error.message : 'error while changing the password of vendor in forget password'
            })
        }
    }
}