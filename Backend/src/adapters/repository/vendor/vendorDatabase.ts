import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { vendorDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { VendorModel } from "../../../framerwork/database/models/vendorModel";
export class VendorDatabase implements vendorDatabaseRepository {
    async createVendor(vendor: VendorEntity): Promise<VendorEntity> {
        return await VendorModel.create(vendor)
    }
    async findByEmail(email: string): Promise<VendorEntity | null> {
        return await VendorModel.findOne({email:email})
    }
}