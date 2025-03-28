import { Request, Response } from "express";
import { IsendOtpForForgetPasswordClient } from "../../../../domain/interface/useCaseInterfaces/client/authentication/sendOtpForForgetPassword";
import { HttpStatus } from "../../../../domain/httpStatus";

export class SendOtpToClientForgetPassword {
    private sendOtpForgetPasswordClientUseCase: IsendOtpForForgetPasswordClient
    constructor(sendOtpForgetPasswordClientUseCase: IsendOtpForForgetPasswordClient) {
        this.sendOtpForgetPasswordClientUseCase = sendOtpForgetPasswordClientUseCase
    }
    async handleSendOtpForgetPassword(req: Request, res: Response): Promise<void> {
        try {
            const {email}=req.body
            await this.sendOtpForgetPasswordClientUseCase.sendOtpForForgetPassword(email)
            res.status(HttpStatus.OK).json({
                message:"OTP Sended"
            })
        } catch (error) {
            console.log('error while sending otp for forget password', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while sending otp for forget password',
                error: error instanceof Error ? error.message : 'error while sending otp for forget password'
            })
        }
    }
}