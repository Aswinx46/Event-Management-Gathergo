import { Request, Response } from "express";
import { IupdateAboutAndPhoneUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/profile/updateAboutAndPhoneUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class UpdateAboutAndPhoneVendorController {
    private updateAboutAndPhoneUseCase: IupdateAboutAndPhoneUseCase
    constructor(updateAboutAndPhoneUseCase: IupdateAboutAndPhoneUseCase) {
        this.updateAboutAndPhoneUseCase = updateAboutAndPhoneUseCase
    }
    async handleUpdateAboutAndPhone(req: Request, res: Response): Promise<void> {
        try {
            const { id, about, phone, name } = req.body
            const updatedVendor = await this.updateAboutAndPhoneUseCase.updateAboutAndPhone(id, about, phone, name)
            res.status(HttpStatus.OK).json({ message: "About and Phone Updated", updatedVendor })
        } catch (error) {
            console.log('Error while updating vendor about and phone', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while updating vendor about and phone",
                error: error instanceof Error ? error.message : 'error whiel updating vendor about and phone'
            })
        }
    }
}