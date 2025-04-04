import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { VendorModel } from "../../../framerwork/database/models/vendorModel";

enum VendorStatus {
    Approved = 'approved',
    Rejected = 'rejected'
}
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
        const pendingVendors = await VendorModel.find({ vendorStatus: 'pending' }).select('-password').skip(skip).limit(limit)
        const totalPages = Math.ceil(await VendorModel.countDocuments({ vendorStatus: 'approved' }) / limit)
        return { pendingVendors, totalPages }
    }
    async changeVendorStatus(vendorId: string, newStatus: VendorStatus): Promise<VendorEntity> {
        const vendor = await VendorModel.findByIdAndUpdate(vendorId, { vendorStatus: newStatus }, { new: true })
        if (!vendor) throw new Error('There is no vendor in this email')
        return vendor
    }
    async findById(vendorId: string): Promise<VendorEntity | null> {
        return await VendorModel.findById(vendorId)
    }
    async rejectPendingVendor(vendorId: string, newStatus: string, rejectionReason: string): Promise<VendorEntity> {
        const vendor = await VendorModel.findByIdAndUpdate(vendorId, { vendorStatus: newStatus, rejectionReason }, { new: true })
        if (!vendor) throw new Error('There is no vendor in this email')
        return vendor
    }
    async findAllRejectedVendor(pageNo: number): Promise<{ rejectedVendors: VendorEntity[]; totalPages: number }> {
        const limit = 5
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const rejectedVendors = await VendorModel.find({ vendorStatus: 'rejected' }).select('-password').skip(skip).limit(limit)
        const totalPages = Math.ceil(await VendorModel.countDocuments({ vendorStatus: 'rejected' }) / limit)
        return { rejectedVendors, totalPages }
    }
    async forgetPassword(email: string, newPassword: string): Promise<VendorEntity | null> {
        return await VendorModel.findOneAndUpdate({ email }, { password: newPassword }, { new: true })
    }
    async updateProfileImage(id: string, imageUrl: string): Promise<VendorEntity | null> {
        return await VendorModel.findByIdAndUpdate(id, { profileImage: imageUrl }, { new: true })
    }
    async findVendorsForCarousal(): Promise<VendorEntity[] | []> {
        return await VendorModel.find({ status: 'active', vendorStatus: 'approved' }).select('name profileImage')
    }
}