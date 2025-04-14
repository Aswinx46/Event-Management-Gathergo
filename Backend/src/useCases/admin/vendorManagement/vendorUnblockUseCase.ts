import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IvendorUnblockUsecase } from "../../../domain/interface/useCaseInterfaces/admin/vendorManagement/vendorUnblockUseCaseInterface";

export class VendorUnblockUseCase implements IvendorUnblockUsecase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async vendorUnblock(vendorId: string): Promise<boolean> {
        const unblockedUser = await this.vendorDatabase.unblockVendor(vendorId)
        if (!unblockedUser) throw new Error("There is no vendor in this ID")
        return true
    }
}