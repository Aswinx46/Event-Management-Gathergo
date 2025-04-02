import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { serviceModal } from "../../../framerwork/database/models/serviceModel";

export class ServiceRepository implements IserviceRepository {
    async createService(service: ServiceEntity): Promise<ServiceEntity> {
        return await serviceModal.create(service)
    }
    async findServiceOfAVendor(vendorId: string): Promise<ServiceEntity[] | []> {
        return await serviceModal.find({ vendorId })
    }
    
}