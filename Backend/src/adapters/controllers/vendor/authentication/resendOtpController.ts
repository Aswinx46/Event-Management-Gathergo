import { Request, Response } from "express";
import { IresendOtpVendorUsecase } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/resendOtpVendorUseCaseInterface";

export class ResendOtpVendorController {
    private resendOtpVendorUseCase: IresendOtpVendorUsecase
    constructor(resendOtpVendorUseCase: IresendOtpVendorUsecase) {
        this.resendOtpVendorUseCase = resendOtpVendorUseCase
    }
    async handleResendOtp(req: Request, res: Response): Promise<void> {
        try {
            const {email}=req.body
            await this.resendOtpVendorUseCase.resendOtp(email)
            res.status(200).json({message:'OTP Resended'})
        } catch (error) {
            console.log('error while resending otp in vendor', error)
            res.status(400).json({
                message: 'error while resending otp',
                error: error instanceof Error ? error.message : 'error while resending otp'
            })
        }
    }
}