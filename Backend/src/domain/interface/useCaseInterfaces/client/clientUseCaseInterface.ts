import { clientEntity } from "../../../entities/clientEntity";

export interface IclientUsecase{
     createClient(client:clientEntity):Promise<clientEntity | null>   
}