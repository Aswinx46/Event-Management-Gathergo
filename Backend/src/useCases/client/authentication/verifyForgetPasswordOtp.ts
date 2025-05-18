import { IotpService } from "../../../domain/interface/serviceInterface/IotpInterface";
import { IverifyForgetPasswordOTP } from "../../../domain/interface/useCaseInterfaces/client/authentication/verifyforgetPasswordOTP";

export class VerifyForgetPasswordOtp implements IverifyForgetPasswordOTP {
    private otpService: IotpService
    constructor(otpService: IotpService) {
        this.otpService = otpService
    }
    async verifyForgetPasswordOtp(email: string, enteredOtp: string): Promise<boolean> {
        const verifyOtp = await this.otpService.verifyOtp(email, enteredOtp)
        if (!verifyOtp) {
            throw new Error('Invalid OTP')
        }
        return verifyOtp
    }
}