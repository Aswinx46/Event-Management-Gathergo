import { ServiceEntity } from "../../../../entities/serviceEntity";

export interface IsearchServiceUseCase {
    searchService(query: string): Promise<ServiceEntity[] | []>
}