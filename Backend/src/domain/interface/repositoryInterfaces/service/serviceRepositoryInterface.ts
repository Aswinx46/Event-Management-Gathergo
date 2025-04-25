import { ServiceEntity } from "../../../entities/serviceEntity";
import { ServiceWithVendorEntity } from "../../../entities/serviceWithVendorEntity";

export interface IserviceRepository {
    createService(service: ServiceEntity): Promise<ServiceEntity>
    findServiceOfAVendor(vendorId: string, pageNo: number): Promise<{ Services: ServiceEntity[] | [], totalPages: number }>
    editService(service: ServiceEntity, serviceId: string): Promise<ServiceEntity | null>
    findServiceById(serviceId: string): Promise<ServiceEntity | null>
    changeStatus(serviceId: string): Promise<ServiceEntity | null>
    findServiceForClient(pageNo: number): Promise<{ Services: ServiceEntity[] | [], totalPages: number }>
    showServiceDataInBookingPage(serviceId: string): Promise<ServiceWithVendorEntity | null>
    findServiceByCategory(categoryId: string | null, pageNo: number, sortBy: string): Promise<{ Services: ServiceEntity[] | [], totalPages: number }>
    searchService(query: string): Promise<ServiceEntity[] | []>
}