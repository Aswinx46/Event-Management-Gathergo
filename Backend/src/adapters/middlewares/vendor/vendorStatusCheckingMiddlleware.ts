import { NextFunction, Request, Response } from "express"
import { IredisService } from "../../../domain/interface/serviceInterface/IredisService"
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository"
import { HttpStatus } from "../../../domain/entities/httpStatus"

export const vendorStatusCheckingMiddleware = (redisService: IredisService, vendorDatabse: IvendorDatabaseRepositoryInterface) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user
        console.log('this is the user in the middleware', user)
        const status = await redisService.get(`user:${user.role}:${user.userId}`)

        if (status) {
            const data = JSON.parse(status)
            if (data.status !== 'active') {
                res.status(HttpStatus.FORBIDDEN).json({ message: "User blocked by admin", code: "USER_BLOCKED" })
                return
            }
            if (data.vendorStatus !== 'approved') {
                res.status(HttpStatus.FORBIDDEN).json({ message: "Vendor not approved by admin", code: "NOT_APPROVED" })
                return
            }
            return next()
        }else{
            const vendorStatusFromDb = await vendorDatabse.findStatusForMiddleware(user.userId)
            if (!vendorStatusFromDb) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "No vendor found in this ID" })
                return
            }
            if (vendorStatusFromDb.status !== 'active') {
                res.status(HttpStatus.FORBIDDEN).json({ message: "User blocked by admin", code: "USER_BLOCKED" })
                return
            }
            if (vendorStatusFromDb.vendorStatus !== 'approved') {
                res.status(HttpStatus.FORBIDDEN).json({ message: "Vendor not approved by admin", code: "NOT_APPROVED" })
                return
            }
            await redisService.set(`user:vendor:${user.userId}`, 15 * 60, JSON.stringify({ status: vendorStatusFromDb.status, vendorStatus: vendorStatusFromDb.vendorStatus }))
        }
        console.log('this is the status from redis', status)
        next()
    }
}