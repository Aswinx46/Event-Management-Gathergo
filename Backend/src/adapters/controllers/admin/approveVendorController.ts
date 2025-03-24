import { Request, Response } from "express";
import { IapproveVendorStatusUsecase } from "../../../domain/interface/useCaseInterfaces/admin/approveVendorStatus";

enum VendorStatus {
    Approved = 'approved',
    Rejected = 'rejected'
}
export class ApproveVendorController {
    private approveVendorUseCase: IapproveVendorStatusUsecase
    constructor(approveVendorUseCase: IapproveVendorStatusUsecase) {
        this.approveVendorUseCase = approveVendorUseCase
    }
    async handleApproveVendorUseCase(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId, newStatus }: { vendorId: string, newStatus: VendorStatus } = req.body
            const updatedVendor = await this.approveVendorUseCase.changeVendorStatus(vendorId, newStatus)
            if (!updatedVendor) {
                res.status(400).json({ message: 'error while  approving or rejecting of vendor' })
                return
            }
            res.status(200).json({message:`Vendor ${newStatus}`,updatedVendor})

        } catch (error) {
            console.log('error while changing approving or rejecting vendor controller', error)
            res.status(400).json({
                message: "error while approving or rejecting vendor",
                error: error instanceof Error ? error.message : 'error while changing vendor status'
            })
        }
    }
}