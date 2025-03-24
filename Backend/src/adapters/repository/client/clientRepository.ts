import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { ClientModel } from "../../../framerwork/database/models/clientModel";
export class clientRepository implements IClientDatabaseRepository {
    async createClient(client: clientEntity): Promise<clientEntity | null> {
        return await ClientModel.create(client)
    }
    async findByEmail(email: string): Promise<clientEntity | null> {
        return await ClientModel.findOne({ email: email })
    }
    async findAllClients(pageNo: number): Promise<{ clients: clientEntity[]; totalPages: number; }> {
        const limit = 5
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const clients = await ClientModel.find({ isAdmin: false }).select('-password').skip(skip).limit(limit)
        const totalPages = Math.ceil(await ClientModel.countDocuments() / limit)
        return { clients, totalPages }
    }
    async googleLogin(client: clientEntity): Promise<clientEntity | null> {
        return await ClientModel.create(client)
    }
}