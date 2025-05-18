import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IemailService } from "../../../domain/interface/serviceInterface/IemailService";
import { IsendOtpForForgetPasswordVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/sendOtpForgetPasswordUseCaseInterface";
import { OtpService } from "../../../framerwork/services/genarateOtp";

export class SendOtpForgetPasswordVendorUseCase implements IsendOtpForForgetPasswordVendorUseCase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    private emailService: IemailService
    private otpService: OtpService
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface, emailService: IemailService, otpService: OtpService) {
        this.vendorDatabase = vendorDatabase
        this.emailService = emailService
        this.otpService = otpService
    }
    async sendOtpForForgetPassword(email: string): Promise<boolean> {
        const vendor = await this.vendorDatabase.findByEmail(email)
        if (!vendor) throw new Error('No vendor found in this email')
        const otp = this.otpService.genarateOtp()
        await this.otpService.storeOtp(email, otp)
        await this.emailService.sendEmailOtp(email, otp)
        return true
    }
}