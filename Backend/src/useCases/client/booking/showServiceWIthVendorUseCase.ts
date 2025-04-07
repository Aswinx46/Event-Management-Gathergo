import { ServiceWithVendorEntity } from "../../../domain/entities/serviceWithVendorEntity";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { IshowServiceWithVendorUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/showServiceWithVendorDetailsUseCaseInterface";

export class ServiceWithVendorUseCase implements IshowServiceWithVendorUseCase {
    private serviceDatabase: IserviceRepository
    constructor(serviceDatabase: IserviceRepository) {
        this.serviceDatabase = serviceDatabase
    }
    async showServiceWithVendorUseCase(serviceId: string): Promise<ServiceWithVendorEntity | null> {
        const serviceWithVendor = await this.serviceDatabase.showServiceDataInBookingPage(serviceId)
        if (!serviceWithVendor) throw new Error('No service found in this service ID')
        return serviceWithVendor
    }
}