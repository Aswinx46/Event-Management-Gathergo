import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { IeditServiceUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/service/editServiceUseCaseInterface";

export class EditServiceUseCase implements IeditServiceUseCase {
    private serviceDatabase: IserviceRepository
    constructor(serviceDatabase: IserviceRepository) {
        this.serviceDatabase = serviceDatabase
    }
    async editService(service: ServiceEntity, serviceId: string): Promise<ServiceEntity | null> {
        const updateService = await this.serviceDatabase.editService(service, serviceId)
        if (!updateService) throw new Error('There is no service in this ID')
        return updateService
    }
}