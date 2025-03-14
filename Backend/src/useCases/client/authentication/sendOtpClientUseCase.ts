import { IemailService } from "../../../domain/interface/serviceInterface/IemailService";
import { IotpService } from "../../../domain/interface/serviceInterface/IotpInterface";
import { IsendOtpClientInterface } from "../../../domain/interface/useCaseInterfaces/client/authentication/sendOtpClientInterface";

export class sendOtpClientUseCase implements IsendOtpClientInterface {
    private otpService:IotpService
    private emailService:IemailService
    constructor(otpService:IotpService,emailService:IemailService){
        this.otpService=otpService
        this.emailService=emailService
    }
    async execute(email: string): Promise<void> {
        const otp=this.otpService.genarateOtp()
        const saveOtp=await this.otpService.storeOtp(email,otp)
        const sendEmail=await this.emailService.sendEmailOtp(email,otp)
    }
    async verifyOtp(email: string,enteredOtp:string): Promise<boolean> {
        const verify=await this.otpService.verifyOtp(email,enteredOtp)
        return verify
    }
}