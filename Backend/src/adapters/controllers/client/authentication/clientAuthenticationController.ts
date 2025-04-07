import { Request, Response } from "express";
import { IclientUsecase } from "../../../../domain/interface/useCaseInterfaces/client/authentication/clientUseCaseInterface";
import { IsendOtpClientInterface } from "../../../../domain/interface/useCaseInterfaces/client/authentication/sendOtpClientInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ClientAuthenticationController {
    private clientUseCase: IclientUsecase
    private clientSendOtpUseCase: IsendOtpClientInterface
    constructor(clientUseCase: IclientUsecase, clientSendOtpUseCase: IsendOtpClientInterface) {
        this.clientUseCase = clientUseCase
        this.clientSendOtpUseCase = clientSendOtpUseCase
    }
    async sendOtp(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            await this.clientSendOtpUseCase.execute(data.email)
            res.status(HttpStatus.OK).json({ message: " OTP sended to the entered mail" })
            return
        } catch (error) {
            console.log('error while sending otp', error)
            res.status(HttpStatus.BAD_REQUEST).json({ message: "error while sending otp", error:error instanceof Error ? error.message : 'error while sending otp' })
        }
    }
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { formdata, otpString } = req.body
            // const otpverification
            const verify = await this.clientSendOtpUseCase.verifyOtp(formdata.email, otpString)
            if (verify) {
                const client = await this.clientUseCase.createClient(formdata)
                res.status(HttpStatus.CREATED).json({ message: "client created", client })
                return
            }else{
                res.status(HttpStatus.BAD_REQUEST).json({ message: "invalid otp"})
              
            }     
        } catch (error) {
            console.log('error while creating client', error)
            res.status(HttpStatus.BAD_REQUEST).json({ 
                message: "Error while creating client", 
                error: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            });
        }
    }
    async resendOtp(req:Request,res:Response):Promise<void>{
        try {
            const {email}=req.body
            console.log('this is the email for the resening otop',email)
            await this.clientSendOtpUseCase.resendOtp(email)
            res.status(HttpStatus.OK).json({message:"Resend otp sended"})
        } catch (error) {
            console.log('error while resending otp',error);
            res.status(HttpStatus.BAD_REQUEST).json({
                message:'error while reseding otp',
                error:error instanceof Error ? error.message : "unknown error",
            })
        }
    }
}