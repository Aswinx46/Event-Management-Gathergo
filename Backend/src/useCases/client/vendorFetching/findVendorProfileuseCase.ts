import { VendorProfileEntityInClient } from "../../../domain/entities/vendor/vendorProfileEntityInClient";
import { IworkSampleRepository } from "../../../domain/interface/repositoryInterfaces/workSamples/workSampleRepositoryInterface";
import { IfindVendorProfileUseCase } from "../../../domain/interface/useCaseInterfaces/client/vendorFetching/findVendorProfileUseCaseInterface";

export class FindVendorProfileUseCase implements IfindVendorProfileUseCase {
    private workSampleDatabase: IworkSampleRepository
    constructor(workSampleDatabase: IworkSampleRepository) {
        this.workSampleDatabase = workSampleDatabase
    }
    async findVendorProfile(vendorId: string): Promise<VendorProfileEntityInClient | null> {
        return await this.workSampleDatabase.vendorProfileIWithWorkSample(vendorId)
    }
}