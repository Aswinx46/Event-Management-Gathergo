import { Request, Response } from "express";
import { IgoogleLoginClientUseCase } from "../../../../domain/interface/useCaseInterfaces/client/authentication/googleLoginUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IjwtInterface } from "../../../../domain/interface/serviceInterface/IjwtService";
import { setCookie } from "../../../../framerwork/services/tokenCookieSettingFunc";
import { IredisService } from "../../../../domain/interface/serviceInterface/IredisService";

export class GoogleLoginClient {
    private googleLoginClientUseCase: IgoogleLoginClientUseCase
    private jwtService: IjwtInterface
    private redisService: IredisService
    constructor(googleLoginClientUseCase: IgoogleLoginClientUseCase, jwtService: IjwtInterface, redisSerivce: IredisService) {
        this.googleLoginClientUseCase = googleLoginClientUseCase
        this.jwtService = jwtService
        this.redisService = redisSerivce
    }
    async handleGoogleLogin(req: Request, res: Response): Promise<void> {
        try {
            console.log('ajhsdfjhasf')
            const { client } = req.body
            const createdClient = await this.googleLoginClientUseCase.googleLogin(client)
            console.log(createdClient)
            const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY as string
            const REFRESHTOKEN_SECRET_KEY = process.env.REFRESHTOKEN_SECRET_KEY as string
            const accessToken = await this.jwtService.createAccessToken(ACCESSTOKEN_SECRET_KEY, createdClient?._id?.toString() || '', createdClient?.role!)
            const refreshToken = await this.jwtService.createRefreshToken(REFRESHTOKEN_SECRET_KEY, createdClient?._id?.toString() || '')
            await this.redisService.set(`user:${createdClient?.role}:${createdClient?._id}`, 15 * 60, createdClient?.role!)
            setCookie(res, refreshToken)
            const selectedFields = {
                clientId: createdClient?.clientId,
                email: createdClient?.email,
                name: createdClient?.name,
                phone: createdClient?.phone,
                profileImage: createdClient?.profileImage,
                _id: createdClient?._id,
                role: createdClient?.role,
                status: createdClient?.status,
                googleVerified:createdClient?.googleVerified
            }
            res.status(HttpStatus.OK).json({ message: 'Google login successFull', client: selectedFields, accessToken })
        } catch (error) {
            console.log('error while google login', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while google login',
                error: error instanceof Error ? error.message : 'error while Google login'
            })
        }

    }
}