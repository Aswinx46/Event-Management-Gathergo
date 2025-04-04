import { ServiceEntity } from "../../../../entities/serviceEntity";

export interface IfindServiceUseCase {
    findServiceForclient(pageNo: number): Promise<{ Services: ServiceEntity[] | [], totalPages: number }>
}