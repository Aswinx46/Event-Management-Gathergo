import { Request, Response } from "express";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IvendorLogoutUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/authentication/vendorLogoutUseCase";

export class VendorLogoutController {
    private vendorLogout: IvendorLogoutUseCase
    constructor(vendorLogout: IvendorLogoutUseCase) {
        this.vendorLogout = vendorLogout
    }
    async handleVendorLogout(req: Request, res: Response): Promise<void> {
        try {
                const authHeader=req.headers.authorization
                
                if(!authHeader || !authHeader.startsWith('Bearer ')){
                    res.status(HttpStatus.BAD_REQUEST).json({ message: 'Authorization header missing' });
                    return;
                }
                const token = authHeader.split(' ')[1];
                
                await this.vendorLogout.vendorLogout(token);

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