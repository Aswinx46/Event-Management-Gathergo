import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { VendorModel } from "../../../framerwork/database/models/vendorModel";
export class VendorDatabase implements IvendorDatabaseRepositoryInterface {
    async createVendor(vendor: VendorEntity): Promise<VendorEntity> {
        return await VendorModel.create(vendor)
    }
    async findByEmail(email: string): Promise<VendorEntity | null> {
        return await VendorModel.findOne({ email: email })
    }
    async findAllVendors(pageNo: number): Promise<{ Vendors: VendorEntity[] | []; totalPages: number; }> {
        const limit = 5
        const page = Math.max(1, pageNo);
        const skip = (page - 1) * limit;
        const Vendors = await VendorModel.find({ vendorStatus: 'approved' }).select('-password').skip(skip).limit(limit)
        const totalPages = Math.ceil(await VendorModel.countDocuments({ vendorStatus: 'approved' }) / limit)
        return { Vendors, totalPages }
    }
    async findAllPendingVendors(pageNo: number): Promise<{ pendingVendors: VendorEntity[]; totalPages: number; }> {
        const limit = 5
        const page = Math.max(1, pageNo);
        const skip = (page - 1) * limit;
        const pendingVendors=await VendorModel.find({vendorStatus:'pending'}).select('-password').skip(skip).limit(limit)
        const totalPages=Math.ceil(await VendorModel.countDocuments({vendorStatus:'approved'}) / limit)
        return {pendingVendors , totalPages}
    }
}