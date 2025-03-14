import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { ClientModel } from "../../../framerwork/database/models/clientModel";
export class clientRepository implements IClientDatabaseRepository{
    async createClient(client: clientEntity): Promise<clientEntity | null> {
        return await ClientModel.create(client)
    }
    async findByEmail(email: string): Promise<clientEntity | null> {
        return ClientModel.findOne({email:email})
    }
}