import { ServiceEntity } from "../../../entities/serviceEntity";

export interface IserviceRepository {
    createService(service: ServiceEntity): Promise<ServiceEntity>
    findServiceOfAVendor(vendorId: string, pageNo: number): Promise<{ Services: ServiceEntity[] | [], totalPages: number }>
    editService(service: ServiceEntity, serviceId: string): Promise<ServiceEntity | null>
    findServiceById(serviceId: string): Promise<ServiceEntity | null>
    changeStatus(serviceId: string): Promise<ServiceEntity | null>
}