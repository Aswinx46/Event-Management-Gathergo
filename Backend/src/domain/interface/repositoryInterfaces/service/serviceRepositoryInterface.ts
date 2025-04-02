import { ServiceEntity } from "../../../entities/serviceEntity";

export interface IserviceRepository {
    createService(service: ServiceEntity): Promise<ServiceEntity>
    findServiceOfAVendor(vendorId: string): Promise<ServiceEntity[] | []>
}