import { clientEntity } from "../../../entities/clientEntity";

export interface IfindAllClientUseCase{
    findAllClient(pageNo:number):Promise<{ clients: clientEntity[]; totalPages: number }>
}