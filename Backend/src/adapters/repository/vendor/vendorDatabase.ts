import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { VendorModel } from "../../../framerwork/database/models/vendorModel";
export class VendorDatabase implements IvendorDatabaseRepositoryInterface {
    async createVendor(vendor: VendorEntity): Promise<VendorEntity> {
        return await VendorModel.create(vendor)
    }
    async findByEmail(email: string): Promise<VendorEntity | null> {
        return await VendorModel.findOne({email:email})
    }
}