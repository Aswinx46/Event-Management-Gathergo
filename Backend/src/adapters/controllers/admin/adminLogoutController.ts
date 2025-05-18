import { Request, Response } from "express";
import { IadminLogoutUseCase } from "../../../domain/interface/useCaseInterfaces/admin/adminLogoutUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class AdminLogoutController {
    private adminLogoutUseCase: IadminLogoutUseCase
    constructor(adminLogoutUseCase: IadminLogoutUseCase) {
        this.adminLogoutUseCase = adminLogoutUseCase
    }
    async handleAdminLogout(req: Request, res: Response): Promise<void> {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'Authorization header missing' });
                return;
            }
            const token = authHeader.split(' ')[1];
            await this.adminLogoutUseCase.logout(token)
            res.status(HttpStatus.OK).json({ message: "Logout successful" });

        } catch (error) {
            console.log('error while handling admin logout', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while handling admin logout',
                error: error instanceof Error ? error.message : 'error while handling admin logout'
            })
        }
    }
}