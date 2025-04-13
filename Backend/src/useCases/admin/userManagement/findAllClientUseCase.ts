import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IfindAllClientUseCase } from "../../../domain/interface/useCaseInterfaces/admin/findAllClientUseCaseInterface";


export class FindAllClientUseCase implements IfindAllClientUseCase {
    private clientDatabase: IClientDatabaseRepository
    constructor(clientDatabase: IClientDatabaseRepository) {
        this.clientDatabase = clientDatabase
    }
    async findAllClient(pageNo: number): Promise<{ clients: clientEntity[]; totalPages: number; }> {
        const {clients,totalPages}=await this.clientDatabase.findAllClients(pageNo)
        return {clients,totalPages}
    }
}