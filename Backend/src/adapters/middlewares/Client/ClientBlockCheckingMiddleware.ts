import { NextFunction, Request, Response } from "express";
import redisService from "../../../framerwork/services/redisService";

import { IredisService } from "../../../domain/interface/serviceInterface/IredisService";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { HttpStatus } from "../../../domain/entities/httpStatus";

// export const clientStatusCheckingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const user = (req as any).user
//     const status = await redisService.get(`user:${user.userId}:${user.role}`)
//     if(!status){

//     }
// }

export const clientStatusCheckingMiddleware = (redisService: IredisService, clientDatabase: IClientDatabaseRepository) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user
        let status = await redisService.get(`user:${user.userId}:${user.role}`)
        if (!status) {
            status = await clientDatabase.findStatusForMiddleware(user.userId)
            await redisService.set(`user:${user.userId}:${user.role}`, 15 * 60, JSON.stringify(status))
        }
        if (status === 'block') {
            res.status(HttpStatus.FORBIDDEN).json({ message: "User blocked by admin" })
            return
        }
        next()
    }
}