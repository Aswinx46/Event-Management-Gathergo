import { Request, Response } from "express";
import { IvendorAuthenticationUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/registerVendorUseCase";
import { IsendOtpVendorInterface } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/sendOtpVendorUseCase";
export class VendorAuthenticationController {
    private vendorAuthenticationUseCase: IvendorAuthenticationUseCase
    private vendorSentOtp: IsendOtpVendorInterface
 
    constructor(vendorAuthenticationUseCase: IvendorAuthenticationUseCase, vendorSentOtp: IsendOtpVendorInterface,) {
        this.vendorAuthenticationUseCase = vendorAuthenticationUseCase
        this.vendorSentOtp = vendorSentOtp
        
    }
    async sendOtp(req: Request, res: Response) {
        try {
            const  vendor  = req.body
            console.log(vendor)
            
            const sendOtp = await this.vendorSentOtp.execute(vendor.email)
            res.status(200).json({ message: "otp sended to the entered email" })
            return
        } catch (error) {
            console.log('error while sending otp ', error)
            res.status(500).json({
                message: "Error while sending otp",
                error: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            });
            return
        }
    }
    async registerVendor(req: Request, res: Response): Promise<void> {
        try {

            const { formdata, enteredOtp } = req.body
            console.log(formdata, enteredOtp)
            const otpVerification = await this.vendorSentOtp.verifyOtp(formdata.email, enteredOtp)
            if(!otpVerification){
                res.status(400).json({message:'Invalid Otp'})
                return
            }
            if (otpVerification) {
                const vendor = await this.vendorAuthenticationUseCase.signupVendor(formdata)
                res.status(201).json({ message: "vendor created", vendor })
            }

        } catch (error) {
            console.log('error while verifying otp', error)
            res.status(500).json({
                message: "Error while verifying client",
                error: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            });
            return
        }
    }
}