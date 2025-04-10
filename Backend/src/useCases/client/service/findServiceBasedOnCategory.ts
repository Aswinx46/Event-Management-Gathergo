import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { IfindServiceOnCategorybasis } from "../../../domain/interface/useCaseInterfaces/client/service/findServiceOnCategoryBasisUseCaseInterface";

export class FindServiceOnCategorybasisUseCase implements IfindServiceOnCategorybasis {
    private serviceDatabase: IserviceRepository
    constructor(serviceDatabase: IserviceRepository) {
        this.serviceDatabase = serviceDatabase
    }
    async findServiceBasedOnCatagory(categoryId: string, pageNo: number): Promise<{ Services: ServiceEntity[] | []; totalPages: number; }> {
        const { Services, totalPages } = await this.serviceDatabase.findServiceByCategory(categoryId, pageNo)
        return { Services, totalPages }
    }
}