import { clientEntity } from "../../../../entities/clientEntity";

export interface IClientLoginuseCase{
    loginClient(email:string,password:string):Promise<clientEntity | null>
}