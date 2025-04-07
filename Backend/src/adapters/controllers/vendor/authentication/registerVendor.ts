import { Request, Response } from "express";
import { IvendorAuthenticationUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/registerVendorUseCase";
import { IsendOtpVendorInterface } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/sendOtpVendorUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
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
            
            
            await this.vendorSentOtp.execute(vendor.email)
            res.status(HttpStatus.OK).json({ message: "otp sended to the entered email" })
            return
        } catch (error) {
            console.log('error while sending otp ', error)
            res.status(HttpStatus.BAD_REQUEST).json({
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
                res.status(HttpStatus.BAD_REQUEST).json({message:'Invalid Otp'})
                return
            }
            if (otpVerification) {
                const vendor = await this.vendorAuthenticationUseCase.signupVendor(formdata)
                res.status(HttpStatus.CREATED).json({ message: "vendor created", vendor })
            }

        } catch (error) {
            console.log('error while verifying otp', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while verifying client",
                error: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            });
            return
        }
    }
}