import { ServiceEntity } from "../../../../entities/serviceEntity";

export interface IfindServiceOnCategorybasis {
    findServiceBasedOnCatagory(categoryId:string,pageNo:number):Promise<{ Services: ServiceEntity[] | [], totalPages: number }>
}