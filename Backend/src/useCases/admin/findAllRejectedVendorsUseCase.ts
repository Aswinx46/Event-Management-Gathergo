import { VendorEntity } from "../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IfindAllRejectedVendor } from "../../domain/interface/useCaseInterfaces/admin/findAllRejectedVendorsUseCaseInterface";

export class FindAllRejectedVendorUseCase implements IfindAllRejectedVendor {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async findRejectedVendors(pageNo: number): Promise<{ rejectedVendors: VendorEntity[] | []; totalPages: number; }> {
        const { rejectedVendors, totalPages } = await this.vendorDatabase.findAllRejectedVendor(pageNo)
        return { rejectedVendors, totalPages }
    }
}