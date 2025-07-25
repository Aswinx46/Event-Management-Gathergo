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
        if (!newClient) throw new Error('Error while creating user')
        const clientDetails: clientEntity = {
            name: newClient?.name,
            clientId: newClient._id!.toString(),
            email: newClient.email,
            phone: newClient.phone,
            role: newClient.role,
            _id: newClient._id,
            googleVerified: newClient.googleVerified,
            profileImage: newClient.profileImage,
            status: newClient.status
        }
        const walletId = genarateRandomUuid()

        const walletDetails: WalletEntity = {
            balance: 0,
            walletId,
            userModel: "client",
            userId: newClient._id!,

        }
        const createWallet = await this.walletDatabase.createWallet(walletDetails)
        if (!createWallet) throw new Error('Error while creating wallet')
        return clientDetails
    }
}