import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IemailService } from "../../../domain/interface/serviceInterface/IemailService";
import { IotpService } from "../../../domain/interface/serviceInterface/IotpInterface";
import { IsendOtpForForgetPasswordClient } from "../../../domain/interface/useCaseInterfaces/client/authentication/sendOtpForForgetPassword";

export class SendOtpForForgetPassword implements IsendOtpForForgetPasswordClient {
    private emailService: IemailService
    private otpService: IotpService
    private clientDatabase: IClientDatabaseRepository
    constructor(emailService: IemailService, otpService: IotpService, clientDatabase: IClientDatabaseRepository) {
        this.emailService = emailService
        this.otpService = otpService
        this.clientDatabase = clientDatabase
    }
    async sendOtpForForgetPassword(email: string): Promise<void> {
        const client = await this.clientDatabase.findByEmail(email)
        if (!client) throw new Error('No Client Found in this email')
        if (client.googleVerified) throw new Error('This account is linked to Google. Please reset your password through your Google account settings')
        const otp = this.otpService.genarateOtp()
        await this.otpService.storeOtp(email, otp)
        await this.emailService.sendEmailOtp(email, otp)
    }
}