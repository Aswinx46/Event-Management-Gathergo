import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IotpService } from "../../../domain/interface/serviceInterface/IotpInterface";
import { IforgetPasswordClientUseCase } from "../../../domain/interface/useCaseInterfaces/client/authentication/forgetPasswordUseCase";
import { hashPassword } from "../../../framerwork/hashPassword/hashpassword";

export class ForgetPasswordClientUseCase implements IforgetPasswordClientUseCase {
    private clientDatabase: IClientDatabaseRepository
    private hashService: hashPassword
    constructor(clientDatabase: IClientDatabaseRepository) {
        this.clientDatabase = clientDatabase
        this.hashService = new hashPassword()
    }
    async forgetPassword(email: string, newPassword: string, otp: string): Promise<clientEntity> {
        const client = await this.clientDatabase.findByEmail(email)
        if (!client) throw new Error('No client exist in this email')
        const hashedPassword = await this.hashService.hashPassword(newPassword)
        if (!hashedPassword) throw new Error('Error while hashing password')
        const updatedClient = await this.clientDatabase.forgotPassword(email, hashedPassword)
        if (!updatedClient) throw new Error('error while updating new password in client')
        return updatedClient
    }
}