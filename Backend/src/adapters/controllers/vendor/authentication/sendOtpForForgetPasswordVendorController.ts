import { Request, Response } from "express";
import { IsendOtpForForgetPasswordVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/sendOtpForgetPasswordUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class SendOtpForForgetPasswordVendorController {
    private sendOtpForForgetPasswordVendorUseCase: IsendOtpForForgetPasswordVendorUseCase
    constructor(sendOtpForForgetPasswordVendorUseCase: IsendOtpForForgetPasswordVendorUseCase) {
        this.sendOtpForForgetPasswordVendorUseCase = sendOtpForForgetPasswordVendorUseCase
    }
    async handleSendOtpForForgetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body
            await this.sendOtpForForgetPasswordVendorUseCase.sendOtpForForgetPassword(email)
            res.status(HttpStatus.OK).json({ message: "OTP Sended" })
        } catch (error) {
            console.log('error while sending otp to the vendor while forgetting password', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while sending otp to the vendor while forgetting password',
                error: error instanceof Error ? error.message : 'error while sending otp to the vendor while forgetting password'
            })
        }
    }
}