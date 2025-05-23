import { Types } from "mongoose";
import { VendorProfileEntityInClient } from "../../../domain/entities/vendor/vendorProfileEntityInClient";
import { WorkSamplesEntity } from "../../../domain/entities/vendor/workSampleEntity";
import { IworkSampleRepository } from "../../../domain/interface/repositoryInterfaces/workSamples/workSampleRepositoryInterface";
import { workSampleModel } from "../../../framerwork/database/models/workSamplesModel";

export class WorkSampleRepository implements IworkSampleRepository {
    async createWorkSamples(workSample: WorkSamplesEntity): Promise<WorkSamplesEntity> {
        return await workSampleModel.create(workSample)
    }
    async findWorkSample(vendorId: string, pageNo: number): Promise<{ workSamples: WorkSamplesEntity[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 3
        const skip = (page - 1) * limit
        const workSamples = await workSampleModel.find({ vendorId }).skip(skip).limit(limit).sort({ createdAt: -1 })
        const totalPages = Math.ceil(await workSampleModel.countDocuments({ vendorId: new Types.ObjectId(vendorId) }) / limit) || 1
        return { workSamples, totalPages }
    }
    async vendorProfileIWithWorkSample(vendorId: string): Promise<VendorProfileEntityInClient | null> {
        return await workSampleModel.findOne({ vendorId }).populate('vendorId', '_id name profileImage').lean<VendorProfileEntityInClient>()
    }
}