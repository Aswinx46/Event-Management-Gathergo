import { Request, Response } from "express";
import { IloginClientControllerInterface } from "../../../../domain/interface/controllerInterfaces/client/IloginClientControllerInterface";
import { IClientLoginuseCase } from "../../../../domain/interface/useCaseInterfaces/client/authentication/clientLoginUseCase";
import { IjwtInterface } from "../../../../domain/interface/serviceInterface/IjwtService";
import { setCookie } from "../../../../framerwork/services/tokenCookieSettingFunc";
import { IredisService } from "../../../../domain/interface/serviceInterface/IredisService";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
export class ClientLoginController implements IloginClientControllerInterface {
    private jwtService: IjwtInterface
    private clientLoginUseCase: IClientLoginuseCase
    private redisService: IredisService
    constructor(clientLoginUseCase: IClientLoginuseCase, jwtService: IjwtInterface, redisService: IredisService) {

        this.clientLoginUseCase = clientLoginUseCase
        this.jwtService = jwtService
        this.redisService = redisService
    }
    async handleLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            console.log('this is the email and the password', email, password)
            const client = await this.clientLoginUseCase.loginClient(email, password)
            if (!client) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "invalid credentials" })
                return
            }
            const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY as string
            const REFRESHTOKEN_SECRET_KEY = process.env.REFRESHTOKEN_SECRET_KEY as string
            const accessToken = this.jwtService.createAccessToken(ACCESSTOKEN_SECRET_KEY, client._id?.toString() || "", client.role)
            const refreshToken = this.jwtService.createRefreshToken(REFRESHTOKEN_SECRET_KEY, client._id?.toString() || "")
            await this.redisService.set(`user:${client.role}:${client._id}`, 15 * 60, JSON.stringify(client.status))
            setCookie(res, refreshToken)
            const selectedFields = {
                clientId: client.clientId,
                email: client.email,
                name: client.name,
                phone: client.phone,
                profileImage: client.profileImage,
                _id: client._id,
                role: client.role,
                status: client.status,
                googleVerified:client.googleVerified
            }
            res.status(HttpStatus.OK).json({ message: "user logged", client: selectedFields, accessToken })

        } catch (error) {
            console.log('error while login client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while login client",
                error: error instanceof Error ? error.message : 'unknown error from login client controller',

            })
        }
    }
}