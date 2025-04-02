import { ServiceEntity } from "../../../../entities/serviceEntity";

export interface IcreateServiceUseCase {
    createService(service: ServiceEntity): Promise<ServiceEntity >
}