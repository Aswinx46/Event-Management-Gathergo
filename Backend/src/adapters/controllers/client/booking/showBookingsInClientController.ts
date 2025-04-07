import { Request, Response } from "express";
import { IshowBookingsInClientUseCase } from "../../../../domain/interface/useCaseInterfaces/client/booking/showBookingsUseCaseInterface";
import { HttpStatus } from "../../../../domain/httpStatus";

export class ShowBookingsInClientController {
    private showBookingsInClient: IshowBookingsInClientUseCase
    constructor(showBookingsInClient: IshowBookingsInClientUseCase) {
        this.showBookingsInClient = showBookingsInClient
    }
    async handleShowBookingsInClient(req: Request, res: Response): Promise<void> {
        try {
            const { clientId } = req.params
            const bookings = await this.showBookingsInClient.findBookings(clientId)
            console.log(bookings)
            res.status(HttpStatus.OK).json({ message: 'Bookings fetched', bookings })
        } catch (error) {
            console.log('error while fetching bookings in client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching bookings in client',
                error: error instanceof Error ? error.message : 'error while fetching bookings in client'
            })
        }
    }
}