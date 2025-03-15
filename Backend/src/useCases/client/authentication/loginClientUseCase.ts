import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IClientLoginuseCase } from "../../../domain/interface/useCaseInterfaces/client/authentication/clientLoginUseCase";
import { hashPassword } from "../../../framerwork/hashPassword/hashpassword";
export class LoginClientUseCase implements IClientLoginuseCase{
    private clientDatabase:IClientDatabaseRepository
    private hashpassword:hashPassword
    constructor(clientDatabase:IClientDatabaseRepository)
    {
        this.clientDatabase=clientDatabase
        this.hashpassword=new hashPassword()
    }
    async loginClient(email: string, password: string): Promise<clientEntity | null> {
        const client=await this.clientDatabase.findByEmail(email)
        if(!client) throw new Error('No client exists with this email')
        const isPasswordValid =await this.hashpassword.comparePassword(password,client.password)
        if(!isPasswordValid ) throw new Error ("invalid password")
        return client
    }
}