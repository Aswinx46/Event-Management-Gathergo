import { VendorEntity } from "../../../domain/entities/vendorEntity"
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository"
import { IapproveVendorStatusUsecase } from "../../../domain/interface/useCaseInterfaces/admin/approveVendorStatus"

enum VendorStatus {
    Approved = 'approved',
    Rejected = 'rejected'
}
export class ApproveVendor implements IapproveVendorStatusUsecase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async changeVendorStatus(vendorId: string, newStatus: VendorStatus): Promise<VendorEntity> {
        const vendorExisting = await this.vendorDatabase.findById(vendorId)
        if (!vendorExisting) throw new Error('there is no vendor exists in this email')
        const vendor = await this.vendorDatabase.changeVendorStatus(vendorId, newStatus)
        return vendor
    }
}