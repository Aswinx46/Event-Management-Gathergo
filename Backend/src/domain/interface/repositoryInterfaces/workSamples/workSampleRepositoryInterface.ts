import { WorkSamplesEntity } from "../../../entities/vendor/workSampleEntity";

export interface IworkSampleRepository {
    createWorkSamples(workSample: WorkSamplesEntity): Promise<WorkSamplesEntity>
    findWorkSample(vendorId:string):Promise<WorkSamplesEntity[] | null>
}     