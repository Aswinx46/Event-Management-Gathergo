import { Request, Response } from "express";
import { IchangePasswordVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/profile/changePasswordUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ChangePasswordVendorControler {
    private changePasswordVendorUseCase: IchangePasswordVendorUseCase
    constructor(changePasswordVendorUseCase: IchangePasswordVendorUseCase) {
        this.changePasswordVendorUseCase = changePasswordVendorUseCase
    }
    async handleChangePasswordVendor(req: Request, res: Response): Promise<void> {
        try {
            const { userId, newPassword, oldPassword } = req.body
            const changePassword = await this.changePasswordVendorUseCase.changePasswordVendor(userId, oldPassword,newPassword)
            res.status(HttpStatus.OK).json({ message: "Password changed" })
        } catch (error) {
            console.log('error while changing password vendor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while changing password vendor",
                error: error instanceof Error ? error.message : 'error while Changing vendor password'
            })
        }
    }
}