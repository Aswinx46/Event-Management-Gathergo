import { WorkSamplesEntity } from "../../../domain/entities/vendor/workSampleEntity";
import { IworkSampleRepository } from "../../../domain/interface/repositoryInterfaces/workSamples/workSampleRepositoryInterface";
import { workSampleModel } from "../../../framerwork/database/models/workSamplesModel";

export class WorkSampleRepository implements IworkSampleRepository {
    async createWorkSamples(workSample: WorkSamplesEntity): Promise<WorkSamplesEntity> {
        return await workSampleModel.create(workSample)
    }
    async findWorkSample(vendorId: string): Promise<WorkSamplesEntity[] | null> {
        return await workSampleModel.find({ vendorId })
    }
}