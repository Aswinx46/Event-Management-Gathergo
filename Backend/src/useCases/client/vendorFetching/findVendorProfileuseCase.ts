import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { VendorProfileEntityInClient } from "../../../domain/entities/vendor/vendorProfileEntityInClient";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { IworkSampleRepository } from "../../../domain/interface/repositoryInterfaces/workSamples/workSampleRepositoryInterface";
import { IfindVendorProfileUseCase } from "../../../domain/interface/useCaseInterfaces/client/vendorFetching/findVendorProfileUseCaseInterface";

export class FindVendorProfileUseCase implements IfindVendorProfileUseCase {
    private workSampleDatabase: IworkSampleRepository
    private serviceDatabase: IserviceRepository
    constructor(workSampleDatabase: IworkSampleRepository, serviceDatabase: IserviceRepository) {
        this.workSampleDatabase = workSampleDatabase
        this.serviceDatabase = serviceDatabase
    }
    async findVendorProfile(vendorId: string, pageNo: number): Promise<{ vendorProfile: VendorProfileEntityInClient | null, services: ServiceEntity[] | [], totalPages: number }> {
        const { Services, totalPages } = await this.serviceDatabase.findServiceOfAVendor(vendorId, pageNo)
        const vendor = await this.workSampleDatabase.vendorProfileIWithWorkSample(vendorId)
        return { vendorProfile: vendor, services: Services, totalPages }
    }
}