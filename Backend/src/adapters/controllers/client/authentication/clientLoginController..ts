import { Request, Response } from "express";
import { IloginClientControllerInterface } from "../../../../domain/interface/controllerInterfaces/client/IloginClientControllerInterface";
import { IClientLoginuseCase } from "../../../../domain/interface/useCaseInterfaces/client/authentication/clientLoginUseCase";
import { IjwtInterface } from "../../../../domain/interface/serviceInterface/IjwtService";
import { setCookie } from "../../../../framerwork/services/tokenCookieSettingFunc";
export class ClientLoginController implements IloginClientControllerInterface {
    private jwtService:IjwtInterface
    private clientLoginUseCase: IClientLoginuseCase
    constructor(clientLoginUseCase: IClientLoginuseCase,jwtService:IjwtInterface) {

        this.clientLoginUseCase = clientLoginUseCase
        this.jwtService=jwtService
    }
    async handleLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const client = await this.clientLoginUseCase.loginClient(email, password)
            if (!client) {
                res.status(400).json({ message: "invalid credentials" })
                return
            }
            const ACCESSTOKEN_SECRET_KEY=process.env.ACCESSTOKEN_SECRET_KEY as string
            const REFRESHTOKEN_SECRET_KEY=process.env.REFRESHTOKEN_SECRET_KEY as string
            const accessToken=this.jwtService.createAccessToken(ACCESSTOKEN_SECRET_KEY, client._id?.toString() || "",client.role)
            const refreshToken=this.jwtService.createRefreshToken(REFRESHTOKEN_SECRET_KEY,client._id?.toString() || "")

            setCookie(res,refreshToken)

            res.status(200).json({ message: "user logged", client,accessToken })

        } catch (error) {
            console.log('error while login client', error)
            res.status(400).json({
                message: "error while login client",
                error: error instanceof Error ? error.message : 'unknown error from login client controller',

            })
        }
    }
}