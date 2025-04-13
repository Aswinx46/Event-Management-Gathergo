import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IfindPendingVendors } from "../../../domain/interface/useCaseInterfaces/admin/findPendingVendors";


export class findAllPendingVendors implements IfindPendingVendors {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async findPendingVendors(pageNo: number): Promise<{ pendingVendors: VendorEntity[] | []; totalPages: number; }> {
        const {pendingVendors,totalPages} = await this.vendorDatabase.findAllPendingVendors(pageNo)
        return {pendingVendors,totalPages}
    }
}