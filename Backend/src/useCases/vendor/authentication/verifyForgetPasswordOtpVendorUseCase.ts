import { IotpService } from "../../../domain/interface/serviceInterface/IotpInterface";
import { IverifyForgetPasswordOtpVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/verifyForgetPasswordOtpUseCaseInterface";

export class VerifyForgetPasswordOtpVendorUseCase implements IverifyForgetPasswordOtpVendorUseCase {
    private otpService: IotpService
    constructor(otpService: IotpService) {
        this.otpService = otpService
    }
    async verifyOtpForgetPasswordVendor(email: string, otp: string): Promise<boolean> {
        const verifyOtp = await this.otpService.verifyOtp(email, otp)
        if (!verifyOtp) throw new Error('Invalid OTP')
        return verifyOtp
    }
}