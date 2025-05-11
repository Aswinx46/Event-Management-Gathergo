import { WorkSamplesEntity } from "../../../../entities/vendor/workSampleEntity";

export interface IfindWorkSamplesOfAVendorUseCase {
    findWorkSamples(vendorId: string,pageNo:number): Promise<{ workSamples: WorkSamplesEntity[] | [], totalPages: number }>
}