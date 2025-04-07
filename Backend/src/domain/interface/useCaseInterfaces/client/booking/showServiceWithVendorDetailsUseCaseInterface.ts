import { ServiceWithVendorEntity } from "../../../../entities/serviceWithVendorEntity";

export interface IshowServiceWithVendorUseCase {
    showServiceWithVendorUseCase(serviceId: string): Promise<ServiceWithVendorEntity | null>
}