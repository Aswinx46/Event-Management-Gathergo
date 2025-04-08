import { Request, Response } from "express";
import { IclientLogoutUseCase } from "../../../../domain/interface/useCaseInterfaces/client/authentication/clientLogoutUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ClientLogoutController {
    private clientLogout: IclientLogoutUseCase
    constructor(clientLogout: IclientLogoutUseCase) {
        this.clientLogout = clientLogout
    }
    async handleClientLogout(req: Request, res: Response): Promise<void> {
        try {
                const authHeader=req.headers.authorization
                
                if(!authHeader || !authHeader.startsWith('Bearer ')){
                    res.status(HttpStatus.BAD_REQUEST).json({ message: 'Authorization header missing' });
                    return;
                }
                const token = authHeader.split(' ')[1];
                
                await this.clientLogout.clientLogout(token);

                res.status(HttpStatus.OK).json({ message: "Logout successful" });

        } catch (error) {
            console.log('error while handling logout client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while handling logout client',
                error: error instanceof Error ? error.message : 'error while handling logout client'
            })
        }
    }
}