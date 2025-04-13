import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IfindAllVendorUsecase } from "../../../domain/interface/useCaseInterfaces/admin/showAllVendorUseCase";


export class FindAllVendorUsecase implements IfindAllVendorUsecase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async findAllVendor(pageNo: number): Promise<{ vendors: VendorEntity[] | []; totalPages: number; }> {
        const {Vendors,totalPages}=await this.vendorDatabase.findAllVendors(pageNo)
        return {vendors:Vendors,totalPages}
    }
}