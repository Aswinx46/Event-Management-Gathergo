import { hashPassword } from "../../../framerwork/hashPassword/hashpassword";
import { clientEntity } from "../../../domain/entities/clientEntity";
import { genarateRandomUuid } from '../../../framerwork/services/randomUuid'
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IclientUsecase } from "../../../domain/interface/useCaseInterfaces/client/authentication/clientUseCaseInterface";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { WalletEntity } from "../../../domain/entities/wallet/wallerEntity";
export class CreateClientUseCase implements IclientUsecase {
    private clientRepository: IClientDatabaseRepository
    private hashpassword: hashPassword
    private walletDatabase: IwalletRepository
    constructor(clientRepository: IClientDatabaseRepository, walletDatabase: IwalletRepository) {
        this.clientRepository = clientRepository
        this.hashpassword = new hashPassword()
        this.walletDatabase = walletDatabase
    }
    async createClient(client: clientEntity): Promise<clientEntity | null> {
        const oldClient = await this.clientRepository.findByEmail(client.email)
        if (oldClient) {
            throw new Error("user already exist")
        }
        const { password, email, phone, name, googleVerified } = client as clientEntity

        let hashedPassword = null
        if (password) {
            hashedPassword = await this.hashpassword.hashPassword(password)
            console.log(hashedPassword)
        }
        const clientId = genarateRandomUuid()

        const newClient = await this.clientRepository.createClient({
            name,
            phone,
            email,
            password: hashedPassword ?? "",
            clientId,
            role: "client",
            isAdmin: false,
            googleVerified

        })
        const walletId = genarateRandomUuid()

        const walletDetails: WalletEntity = {
            balance: 0,
            walletId,
            userModel: "client",
            userId: client._id!,

        }
        const createWallet = await this.walletDatabase.createWallet(walletDetails)
        if (!createWallet) throw new Error('Error while creating wallet')
        return newClient
    }
}