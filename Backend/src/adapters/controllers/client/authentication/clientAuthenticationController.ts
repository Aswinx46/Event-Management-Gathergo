import { Request, Response } from "express";
import { IclientUsecase } from "../../../../domain/interface/useCaseInterfaces/client/clientUseCaseInterface";
import { IsendOtpClientInterface } from "../../../../domain/interface/useCaseInterfaces/client/authentication/sendOtpClientInterface";

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
            res.status(201).json({ message: " OTP sended to the entered mail" })
            return
        } catch (error) {
            console.log('error while sending otp', error)
            res.status(500).json({ message: "error while sending otp", error })
        }
    }
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { formdata, otpString } = req.body
            // const otpverification
            const verify = await this.clientSendOtpUseCase.verifyOtp(formdata.email, otpString)
            if (verify) {
                const client = await this.clientUseCase.createClient(formdata)
                res.status(201).json({ message: "client created", client })
                return
            }else{
                res.status(400).json({ message: "invalid otp"})
              
            }

            
            
        } catch (error) {
            console.log('error while creating client', error)
            res.status(500).json({ message: "error while creating client", error })
        }
    }
}