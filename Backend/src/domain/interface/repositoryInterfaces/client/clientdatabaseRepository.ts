import { clientEntity } from "../../../entities/clientEntity";

export interface IClientDatabaseRepository {
    createClient(client: clientEntity): Promise<clientEntity | null>
    findByEmail(email:string):Promise<clientEntity | null>
    findAllClients(pageNo:number):Promise<{ clients: clientEntity[]; totalPages: number }>
    googleLogin(client:clientEntity):Promise<clientEntity | null>
}