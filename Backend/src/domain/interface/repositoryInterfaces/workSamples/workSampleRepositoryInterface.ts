import { VendorProfileEntityInClient } from "../../../entities/vendor/vendorProfileEntityInClient";
import { WorkSamplesEntity } from "../../../entities/vendor/workSampleEntity";

export interface IworkSampleRepository {
    createWorkSamples(workSample: WorkSamplesEntity): Promise<WorkSamplesEntity>
    findWorkSample(vendorId: string, pageNo: number): Promise<{ workSamples: WorkSamplesEntity[] | [], totalPages: number }>
    vendorProfileIWithWorkSample(vendorId: string): Promise<VendorProfileEntityInClient | null>
}     