import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { VendorLoginUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/registerVendorUseCase";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
export class VendorLoginUsecase implements VendorLoginUseCase {
    private vendorDatabse: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabse = vendorDatabase
    }
    async loginVendor(vendor: VendorEntity): Promise<VendorEntity> {
        const exisingVendor=await this.vendorDatabse.findByEmail(vendor.email)
        if(exisingVendor) throw new Error('this email is already exits')
    }
}