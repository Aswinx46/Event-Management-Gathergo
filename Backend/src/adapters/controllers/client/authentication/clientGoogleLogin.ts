import { Request, Response } from "express";
import { IgoogleLoginClientUseCase } from "../../../../domain/interface/useCaseInterfaces/client/authentication/googleLoginUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class GoogleLoginClient {
    private googleLoginClientUseCase: IgoogleLoginClientUseCase
    constructor(googleLoginClientUseCase: IgoogleLoginClientUseCase) {
        this.googleLoginClientUseCase = googleLoginClientUseCase
    }
    async handleGoogleLogin(req: Request, res: Response): Promise<void> {
        try {
            console.log('ajhsdfjhasf')
            const { client } = req.body
            const createdClient = await this.googleLoginClientUseCase.googleLogin(client)
            res.status(HttpStatus.OK).json({ message: 'Google login successFull', createdClient })
        } catch (error) {
            console.log('error while google login', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while google login',
                error: error instanceof Error ? error.message : 'error while Google login'
            })
        }

    }
}