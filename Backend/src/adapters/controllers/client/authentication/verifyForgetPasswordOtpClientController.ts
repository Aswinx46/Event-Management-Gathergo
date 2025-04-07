import { Request, Response } from "express";
import { IverifyForgetPasswordOTP } from "../../../../domain/interface/useCaseInterfaces/client/authentication/verifyforgetPasswordOTP";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class VerifyForgetPasswordOtpClientController {
    private verifyOtpForgetPasswordClient: IverifyForgetPasswordOTP
    constructor(verifyOtpForgetPasswordClient: IverifyForgetPasswordOTP) {
        this.verifyOtpForgetPasswordClient = verifyOtpForgetPasswordClient
    }
    async handleVerifyOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email, enteredOtp } = req.body
            const verify = await this.verifyOtpForgetPasswordClient.verifyForgetPasswordOtp(email, enteredOtp)
            if (!verify) res.status(HttpStatus.BAD_REQUEST).json({ error: 'error while verifying otp in forgetpassword client' })
            res.status(HttpStatus.OK).json({ message: 'OTP Verified' })
        } catch (error) {
            console.log('error while verifying forgetpassword otp in client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while verifying forgetpassword otp in client',
                error: error instanceof Error ? error.message : 'error while verifying forgetpassword otp in client'
            })
        }
    }
}