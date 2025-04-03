import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { IfindServiceUseCaseInterface } from "../../../domain/interface/useCaseInterfaces/vendor/service/findServiceUseCaseInterface";

export class FindServiceUseCase implements IfindServiceUseCaseInterface {
    private serviceDatabase: IserviceRepository
    constructor(serviceDatabase: IserviceRepository) {
        this.serviceDatabase = serviceDatabase
    }
    async findService(vendorId: string, pageNo: number): Promise<{ Services: ServiceEntity[] | []; totalPages: number; }> {
        const { Services, totalPages } = await this.serviceDatabase.findServiceOfAVendor(vendorId, pageNo)
        return { Services, totalPages }
    }
}