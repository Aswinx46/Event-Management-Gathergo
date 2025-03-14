import { clientEntity } from "../../domain/entities/clientEntity";
import { IuserExistenceService } from "../../domain/interface/serviceInterface/IuserExistenceService";
import { IClientDatabaseRepository } from "../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
export class userExistance implements IuserExistenceService{
    private clientRepository:IClientDatabaseRepository
    constructor(clientRepository:IClientDatabaseRepository){
        this.clientRepository=clientRepository
    }
    async clientFindByEmail(email: string): Promise<clientEntity | null> {
        return await this.clientRepository.findByEmail(email)
    }
}