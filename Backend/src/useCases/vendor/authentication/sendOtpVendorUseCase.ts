import { IemailService } from "../../../domain/interface/serviceInterface/IemailService";
import { IotpService } from "../../../domain/interface/serviceInterface/IotpInterface";
import { IsendOtpVendorInterface } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/sendOtpVendorUseCase";

export class SendOtpVendorUsecase implements IsendOtpVendorInterface {
    private emailService: IemailService
    private otpService: IotpService
    constructor(emailService: IemailService, otpService: IotpService) {
        this.emailService = emailService
        this.otpService = otpService
    }
    async execute(email: string): Promise<void> {
        const otp = this.otpService.genarateOtp()
        await this.otpService.storeOtp(email, otp)
        const sendEmail = this.emailService.sendEmailOtp(email, otp)
    }
    async verifyOtp(email: string, enteredOtp: string): Promise<boolean> {
        const otpverification = await this.otpService.verifyOtp(email, enteredOtp)
        return otpverification
    }
    async resendOtp(email: string): Promise<void> {
        const otp = this.otpService.genarateOtp()
        await this.otpService.storeOtp(email, otp)
        const sendEmail = this.emailService.sendEmailOtp(email, otp)
    }
}