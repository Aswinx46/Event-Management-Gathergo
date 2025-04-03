import { ServiceEntity } from "../../../../entities/serviceEntity";

export interface IeditServiceUseCase {
    editService(service: ServiceEntity, serviceId: string): Promise<ServiceEntity | null>
}