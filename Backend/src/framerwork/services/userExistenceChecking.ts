import { clientEntity } from "../../domain/entities/clientEntity";
import { IuserExistenceService } from "../../domain/interface/serviceInterface/IuserExistenceService";
import { IvendorDatabaseRepositoryInterface } from "../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IClientDatabaseRepository } from "../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
export class userExistance implements IuserExistenceService{
    private clientRepository:IClientDatabaseRepository
    private vendorRepository:IvendorDatabaseRepositoryInterface
    constructor(clientRepository:IClientDatabaseRepository,vendorRepository:IvendorDatabaseRepositoryInterface){
        this.clientRepository=clientRepository
        this.vendorRepository=vendorRepository
    }
    async emailExits(email: string): Promise<Boolean> {
        const [client,vendor]=await Promise.all([
            this.clientRepository.findByEmail(email),
            this.vendorRepository.findByEmail(email)
        ])
        return Boolean(client || vendor)
    }
   
}