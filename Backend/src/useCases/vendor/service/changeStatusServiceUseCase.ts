import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { IchangeStatusServiceUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/service/changeStatusUseCaseInterface";

export class ChangeStatusServiceUseCase implements IchangeStatusServiceUseCase {
    private serviceDatabase: IserviceRepository
    constructor(serviceDatabase: IserviceRepository) {
        this.serviceDatabase = serviceDatabase
    }
    async changeStatus(serviceId: string): Promise<boolean> {
        const changeStatus = await this.serviceDatabase.changeStatus(serviceId)
        if (!changeStatus) throw new Error('No service found in this ID')
        return true
    }
}