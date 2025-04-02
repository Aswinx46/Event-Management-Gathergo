import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { IcreateServiceUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/service/createServiceUseCaseInterface";

export class CreateServiceUseCase implements IcreateServiceUseCase {
    private serviceDatabase: IserviceRepository
    constructor(serviceDatabase: IserviceRepository) {
        this.serviceDatabase = serviceDatabase
    }
    async createService(service: ServiceEntity): Promise<ServiceEntity> {
        return await this.serviceDatabase.createService(service)
    }
}