import { ServiceEntity } from "../../../../entities/serviceEntity";

export interface IfindServiceOnCategorybasis {
    findServiceBasedOnCatagory(categoryId: string | null, pageNo: number, sortBy: string ,): Promise<{ Services: ServiceEntity[] | [], totalPages: number }>
}