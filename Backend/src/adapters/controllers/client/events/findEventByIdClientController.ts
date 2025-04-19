import { Request, Response } from "express";
import { IfindEventByIdUseCase } from "../../../../domain/interface/useCaseInterfaces/client/events/findEventByIdUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindEventByIdClientController {
    private findEventByIdUseCase: IfindEventByIdUseCase
    constructor(findEventByIdUseCase: IfindEventByIdUseCase) {
        this.findEventByIdUseCase = findEventByIdUseCase
    }
    async handleFindEventById(req: Request, res: Response): Promise<void> {
        try {
            const { eventId } = req.params
            console.log(eventId)
            const event = await this.findEventByIdUseCase.findEventById(eventId)
            res.status(HttpStatus.OK).json({
                message: "Event found",
                event
            })
        } catch (error) {
            console.log("error while finding event by id", error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while finding event by id",
                error: error instanceof Error ? error.message : 'Error while finding event by id'
            })
        }
    }
}