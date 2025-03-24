import { Request, Response } from "express";
import { IfindAllClientUseCase } from "../../../domain/interface/useCaseInterfaces/admin/findAllClientUseCaseInterface";

export class FindAllClientsController {
    private findAllClientsUseCase: IfindAllClientUseCase
    constructor(findAllClientsUseCase: IfindAllClientUseCase) {
        this.findAllClientsUseCase = findAllClientsUseCase
    }
    async findAllClient(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = parseInt(req.query.pageNo as string, 10) || 1;
            const { clients, totalPages } = await this.findAllClientsUseCase.findAllClient(pageNo)
            if (!clients) {
                res.status(500).json({ message: "error while fetching the users" })
                return
            }
            res.status(200).json({ message: "clients fetched", clients, totalPages })
        } catch (error) {
            console.log('error while finding all clients', error)
            res.status(400).json({
                message: "error while findiing all clients",
                error: error instanceof Error ? error.message : 'error while finding all clients'
            })
        }
    }
}