import { ServiceEntity } from "../../../../entities/serviceEntity";

export interface IfindServiceUseCaseInterface {
    findService(vendorId: string, pageNo: number): Promise<{ Services: ServiceEntity[] | [], totalPages: number }>
}