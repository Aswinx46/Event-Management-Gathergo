import { Request, Response } from "express";
import { IverifyForgetPasswordOtpVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/verifyForgetPasswordOtpUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class VerifyOtpForgetPasswordVendorController {
    private verifyOtpForgetpasswordVendorUseCase: IverifyForgetPasswordOtpVendorUseCase
    constructor(verifyOtpForgetpasswordVendorUseCase: IverifyForgetPasswordOtpVendorUseCase) {
        this.verifyOtpForgetpasswordVendorUseCase = verifyOtpForgetpasswordVendorUseCase
    }
    async handleVerifyOtpForgetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, enteredOtp } = req.body
            await this.verifyOtpForgetpasswordVendorUseCase.verifyOtpForgetPasswordVendor(email, enteredOtp)
            res.status(HttpStatus.OK).json({
                message: "OTP Verification done"
            })
        } catch (error) {
            console.log('erorr while verifying otp for forget password vendor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while verifying otp for forget password",
                error: error instanceof Error ? error.message : 'error while verifying otp for forget password'
            })
        }
    }
}