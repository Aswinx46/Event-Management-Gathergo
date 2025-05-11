import { WorkSamplesEntity } from "../../../domain/entities/vendor/workSampleEntity";
import { IworkSampleRepository } from "../../../domain/interface/repositoryInterfaces/workSamples/workSampleRepositoryInterface";
import { IfindWorkSamplesOfAVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/workSamples/findWorkSamplesOfAVendorUseCaseInterface";

export class FindWorkSamplesOfAVendorUseCase implements IfindWorkSamplesOfAVendorUseCase {
    private workSampleDatbase: IworkSampleRepository
    constructor(workSampleDatbase: IworkSampleRepository) {
        this.workSampleDatbase = workSampleDatbase
    }
    async findWorkSamples(vendorId: string,pageNo:number): Promise<{ workSamples: WorkSamplesEntity[] | [], totalPages: number }> {
        return await this.workSampleDatbase.findWorkSample(vendorId,pageNo)
    }
}