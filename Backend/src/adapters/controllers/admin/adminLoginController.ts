import { Request, Response } from "express";
import { IadminRepository } from "../../../domain/interface/repositoryInterfaces/admin/IadminDatabaseRepoInterface";
import { IadminLoginUseCase } from "../../../domain/interface/useCaseInterfaces/admin/adminLoginUseCaseInterface";
import { IjwtInterface } from "../../../domain/interface/serviceInterface/IjwtService";
import { IredisService } from "../../../domain/interface/serviceInterface/IredisService";
import { setCookie } from "../../../framerwork/services/tokenCookieSettingFunc";

export class AdminLoginController {
    private adminLoginUseCase: IadminLoginUseCase
    private jwtService: IjwtInterface
    private redisService: IredisService
    constructor(adminLoginUseCase: IadminLoginUseCase, jwtService: IjwtInterface, redisService: IredisService) {
        this.adminLoginUseCase = adminLoginUseCase
        this.jwtService = jwtService
        this.redisService = redisService
    }
    async handleAdminLogin(req: Request, res: Response): Promise<void> {

        try {
            const { email, password } = req.body
            if (!email) {
                res.status(400).json({ message: "invalid email" })
                return
            } else if (!password) {
                res.status(400).json({ message: "invalid password" })
                return
            }
            const admin = await this.adminLoginUseCase.handleLogin(email, password)
            if (!admin) {
                res.status(400).json({ message: "invalid credentials" })
                return
            }
            const accessSecretKey = process.env.ACCESSTOKEN_SECRET_KEY as string
            const refreshSecretKey = process.env.REFRESHTOKEN_SECRET_KEY as string
            const accessToken = await this.jwtService.createAccessToken(accessSecretKey, admin._id?.toString() || '', admin.role)
            const refreshToken = await this.jwtService.createRefreshToken(refreshSecretKey, admin._id?.toString() || '')
            await this.redisService.set(`user:admin:${admin._id}`, 15 * 60, JSON.stringify(admin.status))
            setCookie(res,refreshToken)
            res.status(200).json({message:"admin logged",accessToken})
            return
        } catch (error) {
            console.log('error while admin login', error)
            res.status(400).json({
                message: 'error while login admin',
                error: error instanceof Error ? error.message : 'error while login admin'
            })
        }

    }
}