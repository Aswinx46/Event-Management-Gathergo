import { Request, Response } from "express";
import { IprofileImageUpdateUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/profile/profileImageUpdateUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class UpdateImageVendorController {
    private updateImageVendorUseCase: IprofileImageUpdateUseCase
    constructor(updateImageVendorUseCase: IprofileImageUpdateUseCase) {
        this.updateImageVendorUseCase = updateImageVendorUseCase
    }
    async handleUpdateImageVendor(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId } = req.params
            const files = req.files as Express.Multer.File[]
            const images = files.map((item) => ({ imageBuffer: item.buffer, fileName: item.originalname }))

            const vendor = await this.updateImageVendorUseCase.uploadProfileImage(vendorId, images)
            if (!vendor) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'error while udpating profile image in vendor side' })
                return
            }
            const modifiendVendor = {
                _id: vendor?._id,
                email: vendor?.email,
                name: vendor?.name,
                phone: vendor?.phone,
                role: vendor?.role,
                status: vendor?.status,
                vendorId: vendor?.vendorId,
                vendorStatus: vendor?.vendorStatus,
                rejectReason: vendor?.rejectionReason,
                profileImage: vendor?.profileImage
            }

            res.status(HttpStatus.OK).json({ message: "Vendor profile image updated", updatedVendor: modifiendVendor })
        } catch (error) {
            console.log('error while updating profile image vendor side', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while updating profile image vendor side',
                error: error instanceof Error ? error.message : 'error while updating profile image in vendor side'
            })
        }
    }
}