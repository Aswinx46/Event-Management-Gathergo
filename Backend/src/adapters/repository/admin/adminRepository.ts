import { clientEntity } from "../../../domain/entities/clientEntity";
import { IadminRepository } from "../../../domain/interface/repositoryInterfaces/admin/IadminDatabaseRepoInterface";
import { ClientModel } from "../../../framerwork/database/models/clientModel";
export class AdminRepository implements IadminRepository {
    async findbyEmail(email: string): Promise<clientEntity | null> {
        return await ClientModel.findOne({ email })
    }
    async findById(id: string): Promise<clientEntity | null> {
        return await ClientModel.findById(id)
    }
    async findState(id:string):Promise<string | null>{
        const client= await ClientModel.findById(id).select('role')
        return client?.role ?? null;
    }
}