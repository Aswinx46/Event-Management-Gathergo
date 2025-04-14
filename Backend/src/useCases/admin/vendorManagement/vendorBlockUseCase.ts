import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IvendorBlockUseCase } from "../../../domain/interface/useCaseInterfaces/admin/vendorManagement/vendorBlockUseCaseInterface";

export class VendorBlockUseCase implements IvendorBlockUseCase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async blockVendor(vendorId: string): Promise<boolean> {
        const blockedUser = await this.vendorDatabase.blockVendor(vendorId)
        if (!blockedUser) throw new Error('There is no vendor in this ID')
        return true
    }
}